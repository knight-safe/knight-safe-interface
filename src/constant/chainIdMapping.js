import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { Network } from "alchemy-sdk";
import {
  ARB_APP_FUNCTION_WHITELIST_MAP,
  ARB_TOKEN_WHITELIST_MAP,
} from "./functionMapping";
import { ARB_RPC, ETH_RPC } from "./rpc";
import {
  ARB_FACTORY_ADDR,
  ARB_MASTER_ADDR,
  ARB_MASTER_ADDR_WHITE_LIST,
  ETH_FACTORY_ADDR,
  ETH_MASTER_ADDR,
  ETH_MASTER_ADDR_WHITE_LIST,
} from "./address";
import arbScanLogo from "../assets/images/arbiscan.png";
import ethScanLogo from "../assets/images/etherscan.png";

const chainIdMapping = {
  "0xa4b1": {
    title: "Arbitrum",
    short: "arb1",
    rpc: ARB_RPC,
    scan: "https://arbiscan.io/",
    scanLogo: arbScanLogo,
    tokenMapping: ARB_TOKEN_WHITELIST_MAP,
    functionMapping: ARB_APP_FUNCTION_WHITELIST_MAP,
    alchemyNetwork: Network.ARB_MAINNET,
    masterAddr: ARB_MASTER_ADDR,
    masterAddrWhiteList: ARB_MASTER_ADDR_WHITE_LIST,
    factoryAddr: ARB_FACTORY_ADDR,
    debank: "https://debank.com/profile/",
    gnosisApi: "https://safe-transaction-arbitrum.safe.global/",
    wagmiChain: arbitrum,
  },
  "0x1": {
    title: "Ethereum",
    short: "eth",
    rpc: ETH_RPC,
    scan: "https://etherscan.io/",
    scanLogo: ethScanLogo,
    tokenMapping: ARB_TOKEN_WHITELIST_MAP,
    functionMapping: ARB_APP_FUNCTION_WHITELIST_MAP,
    alchemyNetwork: Network.ETH_MAINNET,
    masterAddr: ETH_MASTER_ADDR,
    masterAddrWhiteList: ETH_MASTER_ADDR_WHITE_LIST,
    factoryAddr: ETH_FACTORY_ADDR,
    debank: "https://debank.com/profile/",
    gnosisApi: "https://safe-transaction-mainnet.safe.global/",
    wagmiChain: mainnet,
  },
};

export default chainIdMapping;
