import { useRecoilState } from "recoil";
import { useCallback } from "react";
import Web3 from "web3";
import tokenRateState from "../atom/tokenRateState";
import aggregatorV3InterfaceABI from "../constant/contract/AggregatorV3Interface_abi.json";
import chainState from "../atom/chainState";
import chainIdMapping from "../constant/chainIdMapping";
import TOKEN_LIST from "../constant/TOKEN_LIST";
import { toChecksumAddress } from "web3-utils";
import { get, has } from "lodash";

const ETH_ADDR = TOKEN_LIST.WETH.address;

const useGetTokenRate = () => {
  const [tokenRate, setTokenRateState] = useRecoilState(tokenRateState);
  const [chain] = useRecoilState(chainState);

  const getTokenRate = useCallback(
    async (tokenAddr) => {
      if (has(tokenRate, tokenAddr)) {
        console.log("no need get");
        return tokenRate[tokenAddr];
      }
      const web3 = new Web3(chainIdMapping[chain].rpc);
      const chainLinkTarget = Object.values(TOKEN_LIST).find((p) =>
        !!get(p, `address.${chain}`)
          ? toChecksumAddress(p.address[chain]) === toChecksumAddress(tokenAddr)
          : false
      );
      if (!chainLinkTarget) {
        return;
      }
      const chainLinkAddr = chainLinkTarget.chainlink[chain];

      try {
        const priceFeed = new web3.eth.Contract(
          aggregatorV3InterfaceABI,
          chainLinkAddr
        );
        const decimals = await priceFeed.methods.decimals().call();
        const roundData = await priceFeed.methods.latestRoundData().call();
        const rate =
          Number(roundData.answer) / Math.pow(10, Number(decimals) ?? 0);
        setTokenRateState((v) => ({ ...v, [tokenAddr]: rate }));
        return rate;
      } catch (e) {
        console.error(e);
      }
    },
    [chain, setTokenRateState, tokenRate]
  );

  const getETHRate = useCallback(async () => {
    const rate = await getTokenRate(ETH_ADDR[chain]);
    setTokenRateState((v) => ({ ...v, [ETH_ADDR[chain]]: rate }));
    return rate;
  }, [chain, getTokenRate, setTokenRateState]);

  return { getTokenRate, getETHRate };
};

export default useGetTokenRate;
