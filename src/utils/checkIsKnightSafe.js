import chainIdMapping from "../constant/chainIdMapping";
import { Web3 } from "web3";

const checkIsKnightSafe = async (addr, chain) => {
  if (!addr || !chain) {
    return false;
  }

  const web3 = new Web3(chainIdMapping[chain].rpc);
  const finstUnit256 = await web3.eth.getStorageAt(addr, 0);
  if (!finstUnit256) {
    return false;
  }
  const isValid = chainIdMapping[chain].masterAddrWhiteList.includes(
    web3.utils.toChecksumAddress(finstUnit256.slice(26, 66))
  );

  if (!isValid) {
    return false;
  }
  return true;
};

export default checkIsKnightSafe;
