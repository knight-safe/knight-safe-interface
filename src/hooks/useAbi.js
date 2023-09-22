import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { Web3 } from "web3";
import axios from "axios";
import { fill, flatten, get, set } from "lodash";
import { isAddress, isBigInt } from "web3-validator";
import { hexToBytes, toBigInt, toChecksumAddress } from "web3-utils";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import {
  prepareSendTransaction,
  sendTransaction,
  waitForTransaction,
  signTypedData,
} from "@wagmi/core";
import chainState from "../atom/chainState";
import chainIdMapping from "../constant/chainIdMapping";
import profileState from "../atom/profileState";
import KNIGHT_SAFE_JSON from "../constant/contract/KnightSafe_abi.json";
import FACTORY_JSON from "../constant/contract/KnightSafeProxyFactory_abi.json";
import ERC20_JSON from "../constant/contract/erc20_abi.json";
import { checkTokenIsOnlist } from "../utils/display";

export const abiScheme = (n, abi = KNIGHT_SAFE_JSON) =>
  abi.find((w) => w.name === n);

const waitGnosisHash = async (url) => {
  let txHash = null;
  let retryCount = 0;

  while (!txHash && retryCount < 5) {
    try {
      await new Promise((r) => setTimeout(r, 500));
      const res = await axios.get(url);
      if (res?.data?.transactionHash) {
        txHash = res.data.transactionHash;
      }
    } catch (error) {
      console.error("waitGnosisHash:", error);
    }

    retryCount++;
  }

  return txHash;
};

const onEncodeSetupABI = (
  accounts,
  traderAddress,
  whiteAddress,
  appControl,
  accessList,
  isRefund,
  FUNCTION_MAP,
  TOKEN_WHITELIST_MAP,
  web3
) => {
  const initAddresses = [];
  const initSelectorLists = [];
  const initParametersLists = [];

  whiteAddress.forEach((c) => {
    initAddresses.push(c);
    initSelectorLists.push([]);
    initParametersLists.push([]);
  });

  appControl.forEach((c) => {
    initAddresses.push(...FUNCTION_MAP[c].map((p) => p.address));
    initSelectorLists.push(
      ...FUNCTION_MAP[c].map((e) =>
        Object.keys(e.data).map((px) => hexToBytes(px))
      )
    );
    initParametersLists.push(
      ...FUNCTION_MAP[c].map((e) => Object.values(e.data))
    );
  });

  accessList.forEach((c) => {
    initAddresses.push(get(TOKEN_WHITELIST_MAP[c], "address"));
    initSelectorLists.push(
      Object.keys(get(TOKEN_WHITELIST_MAP[c], "data")).map((s) => hexToBytes(s))
    );
    initParametersLists.push(
      Object.values(get(TOKEN_WHITELIST_MAP[c], "data"))
    );
  });

  const encodeSetupABI = web3.eth.abi.encodeFunctionCall(abiScheme("setup"), [
    accounts[0],
    traderAddress,
    initAddresses,
    initSelectorLists,
    initParametersLists,
    isRefund,
  ]);
  return encodeSetupABI;
};

const useAbi = () => {
  const [chain] = useRecoilState(chainState);
  const [profile] = useRecoilState(profileState);
  const { address } = useAccount();
  const { chain: walletChain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();

  const getReceipt = useCallback(
    async (txHash) => {
      let tx;
      try {
        tx = await waitForTransaction({ hash: txHash });
      } catch (e) {
        console.error(e);
      }
      if (!tx) {
        // may be gnosis hash
        try {
          const safeToTxHash = await waitGnosisHash(
            `${chainIdMapping[chain].gnosisApi}/api/v1/multisig-transactions/${txHash}`
          );
          if (safeToTxHash) {
            tx = await waitForTransaction({ hash: safeToTxHash });
          }
        } catch (e) {
          console.error(e);
        }
      }
      if (!tx || tx.status !== "success") {
        // eslint-disable-next-line no-throw-literal
        throw {
          innerError: {
            message: "execution reverted: transcation_reverted",
          },
          txHash: tx?.transactionHash,
        };
      }
      return tx;
    },
    [chain]
  );

  const abiReady = useCallback(async () => {
    const accounts = [];
    if (address) {
      accounts.push(address);
    }
    if (!accounts || !accounts.length) {
      throw new Error("No connect wallet");
    }

    const chain10 = parseInt(chain, 16);
    if (walletChain?.id !== chain10) {
      await switchNetworkAsync(chain10);
    }

    return accounts;
  }, [address, chain, switchNetworkAsync, walletChain?.id]);

  const onUpdateWhiteTrader = useCallback(
    async (toRemoveArr = [], toAddArr = []) => {
      const accounts = await abiReady();
      const web3 = new Web3(chainIdMapping[chain].rpc);
      const contract = new web3.eth.Contract(
        KNIGHT_SAFE_JSON,
        profile?.address
      );
      const encodeABI = await contract.methods
        .batchUpdateTraders(toRemoveArr, toAddArr)
        .encodeABI();
      const transactionParameters = {
        to: contract._address,
        from: accounts[0],
        data: encodeABI,
        value: 0,
      };
      const nonce = await web3.eth.getTransactionCount(accounts[0]);
      transactionParameters.nonce = web3.utils.toHex(nonce);
      const gas = web3.utils.numberToHex(
        await web3.eth.estimateGas(transactionParameters)
      );
      transactionParameters.gas = gas;

      const config = await prepareSendTransaction(transactionParameters);
      const { hash } = await sendTransaction(config);
      const rc = await getReceipt(hash);
      return rc;
    },
    [abiReady, chain, getReceipt, profile?.address]
  );

  const onChangeRefund = useCallback(
    async (changeTo) => {
      const accounts = await abiReady();
      const web3 = new Web3(chainIdMapping[chain].rpc);
      const contract = new web3.eth.Contract(
        KNIGHT_SAFE_JSON,
        profile?.address
      );
      const encodeABI = await contract.methods
        .setOwnerRefundGasSpentToSender(changeTo)
        .encodeABI();
      const transactionParameters = {
        to: contract._address,
        from: accounts[0],
        data: encodeABI,
        value: 0,
      };
      const nonce = await web3.eth.getTransactionCount(accounts[0]);
      transactionParameters.nonce = web3.utils.toHex(nonce);
      const gas = web3.utils.numberToHex(
        await web3.eth.estimateGas(transactionParameters)
      );
      transactionParameters.gas = gas;

      const config = await prepareSendTransaction(transactionParameters);
      const { hash } = await sendTransaction(config);
      const rc = await getReceipt(hash);
      return rc;
    },
    [abiReady, chain, getReceipt, profile?.address]
  );

  const onUpdateToken = useCallback(
    async (toRemove = [], toAdd = []) => {
      const accounts = await abiReady();
      const web3 = new Web3(chainIdMapping[chain].rpc);
      const contract = new web3.eth.Contract(
        KNIGHT_SAFE_JSON,
        profile?.address
      );
      const TOKEN_WHITELIST_MAP = chainIdMapping[chain].tokenMapping;

      const param1 = toRemove.map((c) =>
        get(TOKEN_WHITELIST_MAP[c], "address")
      );
      const param2 = toAdd.map((c) => get(TOKEN_WHITELIST_MAP[c], "address"));
      const param3 = toAdd.map((c) =>
        Object.keys(get(TOKEN_WHITELIST_MAP[c], "data")).map((s) =>
          web3.utils.hexToBytes(s)
        )
      );
      const param4 = toAdd.map((c) =>
        Object.values(get(TOKEN_WHITELIST_MAP[c], "data"))
      );

      const encodeABI = web3.eth.abi.encodeFunctionCall(
        abiScheme("batchUpdateWhitelistAddresses"),
        [param1, param2, param3, param4]
      );

      const transactionParameters = {
        to: contract._address,
        from: accounts[0],
        data: encodeABI,
        value: 0,
      };
      const nonce = await web3.eth.getTransactionCount(accounts[0]);
      transactionParameters.nonce = web3.utils.toHex(nonce);
      const gas = web3.utils.numberToHex(
        await web3.eth.estimateGas(transactionParameters)
      );
      transactionParameters.gas = gas;

      const config = await prepareSendTransaction(transactionParameters);
      const { hash } = await sendTransaction(config);
      const rc = await getReceipt(hash);
      return rc;
    },
    [abiReady, chain, getReceipt, profile?.address]
  );

  const onUpdateWhiteWallet = useCallback(
    async (toRemove = [], toAdd = []) => {
      const accounts = await abiReady();
      const web3 = new Web3(chainIdMapping[chain].rpc);
      const contract = new web3.eth.Contract(
        KNIGHT_SAFE_JSON,
        profile?.address
      );

      const emptyParam = fill(Array(toAdd.length), []);
      const encodeABI = web3.eth.abi.encodeFunctionCall(
        abiScheme("batchUpdateWhitelistAddresses"),
        [toRemove, toAdd, emptyParam, emptyParam]
      );

      const transactionParameters = {
        to: contract._address,
        from: accounts[0],
        data: encodeABI,
        value: 0,
      };
      const nonce = await web3.eth.getTransactionCount(accounts[0]);
      transactionParameters.nonce = web3.utils.toHex(nonce);
      const gas = web3.utils.numberToHex(
        await web3.eth.estimateGas(transactionParameters)
      );
      transactionParameters.gas = gas;

      const config = await prepareSendTransaction(transactionParameters);
      const { hash } = await sendTransaction(config);
      const rc = await getReceipt(hash);
      return rc;
    },
    [abiReady, chain, getReceipt, profile?.address]
  );

  const onUpdateApp = useCallback(
    async (toRemove = [], toAdd = []) => {
      const accounts = await abiReady();
      const web3 = new Web3(chainIdMapping[chain].rpc);
      const contract = new web3.eth.Contract(
        KNIGHT_SAFE_JSON,
        profile?.address
      );
      const FUNCTION_MAP = chainIdMapping[chain].functionMapping;

      const param1 = flatten(
        toRemove.map((c) => FUNCTION_MAP[c].map((p) => p.address))
      );
      const param2 = flatten(
        toAdd.map((c) => FUNCTION_MAP[c].map((p) => p.address))
      );
      const param3 = flatten(
        toAdd.map((c) =>
          FUNCTION_MAP[c].map((e) =>
            Object.keys(e.data).map((px) => web3.utils.hexToBytes(px))
          )
        )
      );
      const param4 = flatten(
        toAdd.map((c) => FUNCTION_MAP[c].map((e) => Object.values(e.data)))
      );

      const encodeABI = web3.eth.abi.encodeFunctionCall(
        abiScheme("batchUpdateWhitelistAddresses"),
        [param1, param2, param3, param4]
      );

      const transactionParameters = {
        to: contract._address,
        from: accounts[0],
        data: encodeABI,
        value: 0,
      };
      const nonce = await web3.eth.getTransactionCount(accounts[0]);
      transactionParameters.nonce = web3.utils.toHex(nonce);
      const gas = web3.utils.numberToHex(
        await web3.eth.estimateGas(transactionParameters)
      );
      transactionParameters.gas = gas;

      const config = await prepareSendTransaction(transactionParameters);
      const { hash } = await sendTransaction(config);
      const rc = await getReceipt(hash);
      return rc;
    },
    [abiReady, chain, getReceipt, profile?.address]
  );

  const onChangeOwner = useCallback(
    async (addr) => {
      const accounts = await abiReady();

      const web3 = new Web3(chainIdMapping[chain].rpc);
      const contract = new web3.eth.Contract(
        KNIGHT_SAFE_JSON,
        profile?.address
      );

      const encodeABI = web3.eth.abi.encodeFunctionCall(
        abiScheme("transferOwnership"),
        [addr]
      );

      const transactionParameters = {
        to: contract._address,
        from: accounts[0],
        data: encodeABI,
        value: 0,
      };
      const nonce = await web3.eth.getTransactionCount(accounts[0]);
      transactionParameters.nonce = web3.utils.toHex(nonce);
      const gas = web3.utils.numberToHex(
        await web3.eth.estimateGas(transactionParameters)
      );
      transactionParameters.gas = gas;

      const config = await prepareSendTransaction(transactionParameters);
      const { hash } = await sendTransaction(config);
      const rc = await getReceipt(hash);
      return rc;
    },
    [abiReady, chain, getReceipt, profile?.address]
  );

  const onAcceptPendingOwner = useCallback(async () => {
    const accounts = await abiReady();
    const web3 = new Web3(chainIdMapping[chain].rpc);
    const contract = new web3.eth.Contract(KNIGHT_SAFE_JSON, profile?.address);

    const encodeABI = web3.eth.abi.encodeFunctionCall(
      abiScheme("acceptOwnership"),
      []
    );

    const transactionParameters = {
      to: contract._address,
      from: accounts[0],
      data: encodeABI,
      value: 0,
    };
    const nonce = await web3.eth.getTransactionCount(accounts[0]);
    transactionParameters.nonce = web3.utils.toHex(nonce);
    const gas = web3.utils.numberToHex(
      await web3.eth.estimateGas(transactionParameters)
    );
    transactionParameters.gas = gas;

    const config = await prepareSendTransaction(transactionParameters);
    const { hash } = await sendTransaction(config);
    const rc = await getReceipt(hash);
    return rc;
  }, [abiReady, chain, getReceipt, profile?.address]);

  const onExecTransaction = useCallback(
    async (exceTo, exceValue, exceData) => {
      const accounts = await abiReady();
      const web3 = new Web3(chainIdMapping[chain].rpc);
      const knightContract = new web3.eth.Contract(
        KNIGHT_SAFE_JSON,
        profile?.address
      );
      const knight_encodeABI = web3.eth.abi.encodeFunctionCall(
        abiScheme("execTransaction"),
        [exceTo, exceValue, exceData]
      );
      const knight_transactionParameters = {
        from: accounts[0],
        to: knightContract._address,
        value: 0,
        data: knight_encodeABI,
      };

      const knight_gas = web3.utils.numberToHex(
        await web3.eth.estimateGas(knight_transactionParameters)
      );
      const nonce = await web3.eth.getTransactionCount(accounts[0]);
      knight_transactionParameters.nonce = web3.utils.toHex(nonce);
      knight_transactionParameters.gas = knight_gas;

      const config = await prepareSendTransaction(knight_transactionParameters);
      const { hash } = await sendTransaction(config);
      const rc = await getReceipt(hash);
      return rc;
    },
    [abiReady, chain, getReceipt, profile?.address]
  );

  const onTransfer = useCallback(
    async (coinAddress, targetAddress, am) => {
      const amount = toBigInt(am);
      const accounts = await abiReady();
      if (
        !coinAddress ||
        !isAddress(coinAddress) ||
        !targetAddress ||
        !isAddress(targetAddress)
      ) {
        throw new Error("wrong recipient");
      }
      if (!amount || !isBigInt(amount)) {
        throw new Error("wrong amount");
      }
      if (!checkTokenIsOnlist(coinAddress, chain)) {
        throw new Error("contract not on list");
      }

      const web3 = new Web3(chainIdMapping[chain].rpc);

      const erc20_encodeABI = web3.eth.abi.encodeFunctionCall(
        abiScheme("transfer", ERC20_JSON),
        [targetAddress, amount]
      );

      const rc = await onExecTransaction(coinAddress, 0, erc20_encodeABI);
      return rc;
    },
    [abiReady, chain, onExecTransaction]
  );

  const onSendEth = useCallback(
    async (targetAddress, am) => {
      const amount = toBigInt(am);
      const accounts = await abiReady();
      if (!targetAddress || !isAddress(targetAddress)) {
        throw new Error("wrong recipient");
      }
      if (!amount || !isBigInt(amount)) {
        throw new Error("wrong amount");
      }

      const rc = await onExecTransaction(targetAddress, amount, "0x");
      return rc;
    },
    [abiReady, onExecTransaction]
  );

  const onCreateNewWallet = useCallback(
    async (traderAddress, whiteAddress, appControl, accessList, isRefund) => {
      const accounts = await abiReady();
      const web3 = new Web3(chainIdMapping[chain].rpc);

      const factoryContract = new web3.eth.Contract(
        FACTORY_JSON,
        chainIdMapping[chain].factoryAddr
      );

      const TOKEN_WHITELIST_MAP = chainIdMapping[chain].tokenMapping;
      const FUNCTION_MAP = chainIdMapping[chain].functionMapping;

      const encodeSetupABI = onEncodeSetupABI(
        accounts,
        traderAddress,
        whiteAddress,
        appControl,
        accessList,
        isRefund,
        FUNCTION_MAP,
        TOKEN_WHITELIST_MAP,
        web3
      );

      const encodeABI = web3.eth.abi.encodeFunctionCall(
        abiScheme("createProxy", FACTORY_JSON),
        [chainIdMapping[chain].masterAddr, encodeSetupABI]
      );
      // const acNo = await getTransactionCount(accounts[0]);
      // console.log("541 ~ useAbi ~ acNo:", acNo);
      const transactionParameters = {
        to: factoryContract._address,
        from: accounts[0],
        data: encodeABI,
        value: 0,
      };
      const nonce = await web3.eth.getTransactionCount(accounts[0]);
      transactionParameters.nonce = web3.utils.toHex(nonce);
      const gas = web3.utils.numberToHex(
        await web3.eth.estimateGas(transactionParameters)
      );
      transactionParameters.gas = gas;

      const config = await prepareSendTransaction(transactionParameters);
      const { hash } = await sendTransaction(config);
      const rc = await getReceipt(hash);

      const rcm = rc.logs.find(
        (d) =>
          toChecksumAddress(d.address) ===
          toChecksumAddress(chainIdMapping[chain].factoryAddr)
      );
      const bornAddress = "0x" + rcm.data.slice(26, 66);
      console.log("624 ~ useAbi ~ bornAddress:", bornAddress);
      if (!bornAddress) {
        throw new Error("No account found");
      }
      return bornAddress;
    },
    [abiReady, chain, getReceipt]
  );

  const onSignDataV4 = useCallback(async (signBody) => {
    if (get(signBody, "domain.chainId")) {
      set(signBody, "domain.chainId", Number(get(signBody, "domain.chainId")));
    }
    const signedMessage = await signTypedData(signBody);
    return signedMessage;
  }, []);

  return {
    onUpdateWhiteTrader,
    onChangeRefund,
    onUpdateToken,
    onUpdateWhiteWallet,
    onUpdateApp,
    onChangeOwner,
    onAcceptPendingOwner,
    onExecTransaction,
    onTransfer,
    onSendEth,
    onCreateNewWallet,
    onSignDataV4,
  };
};

export default useAbi;
