import Web3 from "web3";
import {
  difference,
  flatten,
  isArray,
  isEqual,
  isFunction,
  map,
  pickBy,
  pullAll,
  values,
} from "lodash";
import { Alchemy } from "alchemy-sdk";
import { fromWei, toChecksumAddress } from "web3-utils";
import KNIGHT_SAFE_JSON from "../constant/contract/KnightSafe_abi.json";
import chainIdMapping from "../constant/chainIdMapping";
import checkIsKnightSafe from "./checkIsKnightSafe";
import { KS_WALLET_SUFFIX } from "../constant/address";

const sumArr = (arr) => arr.map((a) => toChecksumAddress(a));

const strArr = (arr) =>
  map(arr, (s) => (isArray(s) ? s.map((e) => strArr(e)) : s.toString()));

const getKnightSafeProfile = async (addr, chain, errorCallBack) => {
  const startTime = Date.now();
  try {
    const web3 = new Web3(chainIdMapping[chain].rpc);
    const contract = new web3.eth.Contract(KNIGHT_SAFE_JSON, addr);

    const alchemyConfig = {
      apiKey: process.env.REACT_APP_ALCHEMY_KEY,
      network: chainIdMapping[chain].alchemyNetwork,
    };
    const alchemy = new Alchemy(alchemyConfig);

    const [
      ownerRes,
      pendingOwnerRes,
      isGasRefundRes,
      tradersRes,
      whiteAddrRes,
      weiBalanceRes,
      tokensForOwnerRes,
    ] = await Promise.all([
      contract.methods.getOwner().call(),
      contract.methods.getPendingOwner().call(),
      contract.methods.getIsGasRefund().call(),
      contract.methods.getTraders().call(),
      contract.methods.getWhitelistAddresses().call(),
      alchemy.core.getBalance(addr),
      alchemy.core.getTokensForOwner(addr),
    ]);
    const whitelists = sumArr([...whiteAddrRes]);

    let whitelist_app_list = [];
    let whitelist_token_list = [];
    let whitelist_wallet_list = [];
    let whitelist_others_list = [];
    let knigihtSafe_wallet_list = [];

    const APP_FUNCTION_WHITELIST_MAP = chainIdMapping[chain].functionMapping;
    const TOKEN_WHITELIST_MAP = chainIdMapping[chain].tokenMapping;

    //region Check for App
    const funcPick = pickBy(APP_FUNCTION_WHITELIST_MAP, (e) => {
      const yyt = sumArr(e.map((c) => c.address));
      return difference(yyt, whitelists).length < 1;
    });
    const funcPickAddrList = flatten(
      map(funcPick, (e) => e.map((f) => toChecksumAddress(f.address)))
    );
    const funcPickCheck = async (wca, key) => {
      const res = await Promise.all(
        wca.map((wc) =>
          contract.methods
            .getWhitelistFunctionParametersMultiple(
              wc.address,
              Object.keys(wc.data)
            )
            .call()
        )
      );
      const mappingFunc = strArr(
        APP_FUNCTION_WHITELIST_MAP[key].map((po) => values(po.data))
      );
      const resFunc = strArr(res);
      if (isEqual(mappingFunc, resFunc)) {
        whitelist_app_list.push(key);
      }
    };

    // region Check for Token
    const tokenPick = pickBy(TOKEN_WHITELIST_MAP, (e) =>
      whitelists
        .map((p) => toChecksumAddress(p))
        .includes(toChecksumAddress(e.address))
    );
    const tokenPickAddrList = map(tokenPick, (s) =>
      toChecksumAddress(s.address)
    );
    const tokenPickCheck = async (wc, key) => {
      const res = await contract.methods
        .getWhitelistFunctionParametersMultiple(
          wc.address,
          Object.keys(wc.data)
        )
        .call();
      const mappingFunc = strArr(values(TOKEN_WHITELIST_MAP[key].data));
      const resFunc = strArr(res);
      if (isEqual(mappingFunc, resFunc)) {
        whitelist_token_list.push(key);
      }
    };
    const otherAddrList = pullAll(whitelists, [
      ...funcPickAddrList,
      ...tokenPickAddrList,
    ]);
    const otherCheck = async (wc) => {
      const isKnightSafe = await checkIsKnightSafe(wc, chain);
      // const addrCode = await web3.eth.getCode(wc);
      if (isKnightSafe) {
        knigihtSafe_wallet_list.push(`${wc}--${KS_WALLET_SUFFIX}`);
      } else {
        whitelist_wallet_list.push(`${wc}--whiteList`);
      }
    };
    await Promise.all([
      ...map(funcPick, funcPickCheck),
      ...map(tokenPick, tokenPickCheck),
      ...map(otherAddrList, otherCheck),
    ]);

    // region Check for Wallet or Others
    const data = {
      address: addr,
      owner: ownerRes,
      pendingOwner: pendingOwnerRes,
      isGasRefund: isGasRefundRes,
      traders: tradersRes,
      app: whitelist_app_list.sort(),
      token: whitelist_token_list.sort(),
      wallet: [
        ...knigihtSafe_wallet_list.sort(),
        ...whitelist_wallet_list.sort(),
      ],
      other: whitelist_others_list.sort(),
      ethBalance: fromWei(weiBalanceRes, "ether"),
      tokensForOwner: tokensForOwnerRes.tokens.filter((p) => +p.balance > 0),
      lastUpdateTime: new Date(),
    };

    console.log("need time: ", Math.floor(Date.now()) - Math.floor(startTime));
    return data;
  } catch (e) {
    console.error(e);
    if (isFunction(errorCallBack)) {
      errorCallBack(e);
    }
    return null;
  }
};

export default getKnightSafeProfile;
