import aave_img from "../assets/images/aavee.png";
import gmx_img from "../assets/images/GMX.png";
import uni_img from "../assets/images/Uniswap.png";

const APP_LIST = {
  GMX: {
    title: "GMX v1",
    enable: false,
    img: gmx_img,
    desc: "Decentralized Perpetual Exchange",
    link: "https://app.gmx.io",
    func: {
      EARN: false,
      TRADE: false,
    },
    platform: {
      "0x1": false,
      "0xa4b1": true,
    },
  },
  AAVE: {
    title: "Aave v3",
    enable: false,
    img: aave_img,
    desc: "Open Source Liquidity Protocol",
    link: "https://app.aave.com/?marketName=proto_arbitrum_v3",
    func: {
      LEND: false,
    },
    platform: {
      "0x1": true,
      "0xa4b1": true,
    },
  },
  UNISWAP: {
    title: "Uniswap v3",
    enable: false,
    img: uni_img,
    desc: "Swap, earn, and build on the leading decentralized crypto trading protocol",
    link: "https://app.uniswap.org/#/swap",
    func: {
      SWAP: false,
    },
    platform: {
      "0x1": true,
      "0xa4b1": true,
    },
  },
};
export default APP_LIST;
