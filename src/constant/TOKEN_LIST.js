import WETH_img from "../assets/images/token/WETH.png";
import ARB_img from "../assets/images/token/ARB.png";
import COMP_img from "../assets/images/token/COMP.png";
import CRV_img from "../assets/images/token/CRV.png";
import DAI_img from "../assets/images/token/DAI.png";
import GMX_img from "../assets/images/token/GMX.png";
import GRT_img from "../assets/images/token/GRT.png";
import LDO_img from "../assets/images/token/LDO.png";
import LINK_img from "../assets/images/token/LINK.png";
import MKR_img from "../assets/images/token/MKR.png";
import TUSD_img from "../assets/images/token/TUSD.png";
import UNI_img from "../assets/images/token/UNI.png";
import USDC_img from "../assets/images/token/USDC.png";
import USDD_img from "../assets/images/token/USDD.png";
import USDT_img from "../assets/images/token/USDT.png";
import WBTC_img from "../assets/images/token/WBTC.png";
import FRAX_img from "../assets/images/token/FRAX.png";

const TOKEN_LIST = {
  USDT: {
    symbol: "USDT",
    img: USDT_img,
    title: "Tether",
    chainlink: {
      "0xa4b1": "0x3f3f5dF88dC9F13eac63DF89EC16ef6e7E25DdE7",
      "0x1": "0x3E7d1eAB13ad0104d2750B8863b489D65364e32D",
    },
    address: {
      "0x1": "0xdac17f958d2ee523a2206206994597c13d831ec7",
      "0xa4b1": "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    },
  },
  USDC: {
    symbol: "USDC",
    img: USDC_img,
    title: "USD Coin",
    chainlink: {
      "0xa4b1": "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3",
      "0x1": "0x8fFfFfd4AfB6115b954Bd326cbe7B4BA576818f6",
    },
    address: {
      "0x1": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
      "0xa4b1": "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    },
  },
  "USDC.e": {
    symbol: "USDC.e",
    img: USDC_img,
    title: "Bridged USDC",
    chainlink: {
      "0xa4b1": "0x50834F3163758fcC1Df9973b6e91f0F0F0434aD3",
      "0x1": "",
    },
    address: {
      "0x1": "",
      "0xa4b1": "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    },
  },
  DAI: {
    symbol: "DAI",
    img: DAI_img,
    title: "Dai",
    chainlink: {
      "0xa4b1": "0xc5C8E77B397E531B8EC06BFb0048328B30E9eCfB",
      "0x1": "0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1ee9",
    },
    address: {
      "0x1": "0x6b175474e89094c44da98b954eedeac495271d0f",
      "0xa4b1": "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1",
    },
  },
  WBTC: {
    symbol: "WBTC",
    img: WBTC_img,
    title: "Wrapped Bitcoin",
    chainlink: {
      "0xa4b1": "0xd0C7101eACbB49F3deCcCc166d238410D6D46d57",
      "0x1": "0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c",
    },
    address: {
      "0x1": "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
      "0xa4b1": "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
    },
  },
  WETH: {
    symbol: "WETH",
    img: WETH_img,
    title: "Wrapped ETH",
    chainlink: {
      "0xa4b1": "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
      "0x1": "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
    },
    address: {
      "0x1": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "0xa4b1": "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    },
  },
  LINK: {
    symbol: "LINK",
    img: LINK_img,
    title: "Chainlink",
    chainlink: {
      "0xa4b1": "0x86E53CF1B870786351Da77A57575e79CB55812CB",
      "0x1": "0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c",
    },
    address: {
      "0x1": "0x514910771af9ca656af840dff83e8264ecf986ca",
      "0xa4b1": "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4",
    },
  },
  UNI: {
    symbol: "UNI",
    img: UNI_img,
    title: "Uniswap",
    chainlink: {
      "0xa4b1": "0x9C917083fDb403ab5ADbEC26Ee294f6EcAda2720",
      "0x1": "0x553303d460EE0afB37EdFf9bE42922D8FF63220e",
    },
    address: {
      "0x1": "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
      "0xa4b1": "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0",
    },
  },
  TUSD: {
    symbol: "TUSD",
    img: TUSD_img,
    title: "TrueUSD",
    chainlink: {
      "0xa4b1": "0x6fAbee62266Da6686EE2744C6f15bb8352d2f28D",
      "0x1": "0xec746eCF986E2927Abd291a2A1716c940100f8Ba",
    },
    address: {
      "0x1": "0x0000000000085d4780B73119b644AE5ecd22b376",
      "0xa4b1": "0x4D15a3A2286D883AF0AA1B3f21367843FAc63E07",
    },
  },
  LDO: {
    symbol: "LDO",
    img: LDO_img,
    title: "Lido DAO",
    chainlink: { "0xa4b1": "", "0x1": "" },
    address: {
      "0x1": "0x5a98fcbea516cf06857215779fd812ca3bef1b32",
      "0xa4b1": "",
    },
  },
  ARB: {
    symbol: "ARB",
    img: ARB_img,
    title: "Arbitrum",
    chainlink: {
      "0xa4b1": "0xb2A824043730FE05F3DA2efaFa1CBbe83fa548D6",
      "0x1": "",
    },
    address: {
      "0x1": "0xB50721BCf8d664c30412Cfbc6cf7a15145234ad1",
      "0xa4b1": "0x912CE59144191C1204E64559FE8253a0e49E6548",
    },
  },
  GRT: {
    symbol: "GRT",
    img: GRT_img,
    title: "The Graph",
    chainlink: {
      "0xa4b1": "",
      "0x1": "0x86cF33a451dE9dc61a2862FD94FF4ad4Bd65A5d2",
    },
    address: {
      "0x1": "0xc944e90c64b2c07662a292be6244bdf05cda44a7",
      "0xa4b1": "0x9623063377AD1B27544C965cCd7342f7EA7e88C7",
    },
  },
  FRAX: {
    symbol: "FRAX",
    img: FRAX_img,
    title: "Frax",
    chainlink: {
      "0xa4b1": "0x0809E3d38d1B4214958faf06D8b1B1a2b73f2ab8",
      "0x1": "0xB9E1E3A9feFf48998E45Fa90847ed4D467E8BcfD",
    },
    address: {
      "0x1": "0x853d955acef822db058eb8505911ed77f175b99e",
      "0xa4b1": "0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F",
    },
  },
  MKR: {
    symbol: "MKR",
    img: MKR_img,
    title: "Maker",
    chainlink: {
      "0xa4b1": "",
      "0x1": "0xec1D1B3b0443256cc3860e24a46F108e699484Aa",
    },
    address: {
      "0x1": "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
      "0xa4b1": "",
    },
  },
  USDD: {
    symbol: "USDD",
    img: USDD_img,
    title: "USDD",
    chainlink: {
      "0xa4b1": "",
      "0x1": "0x0ed39A19D2a68b722408d84e4d970827f61E6c0A",
    },
    address: {
      "0x1": "0x0c10bf8fcb7bf5412187a595ab97a3609160b5c6",
      "0xa4b1": "",
    },
  },
  CRV: {
    symbol: "CRV",
    img: CRV_img,
    title: "Curve DAO Token",
    chainlink: {
      "0xa4b1": "0xaebDA2c976cfd1eE1977Eac079B4382acb849325",
      "0x1": "0xCd627aA160A6fA45Eb793D19Ef54f5062F20f33f",
    },
    address: {
      "0x1": "0xD533a949740bb3306d119CC777fa900bA034cd52",
      "0xa4b1": "0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978",
    },
  },
  COMP: {
    symbol: "COMP",
    img: COMP_img,
    title: "Compound",
    chainlink: {
      "0xa4b1": "",
      "0x1": "0xdbd020CAeF83eFd542f4De03e3cF0C28A4428bd5",
    },
    address: {
      "0x1": "0xc00e94cb662c3520282e6f5717214004a7f26888",
      "0xa4b1": "",
    },
  },
  GMX: {
    symbol: "GMX",
    img: GMX_img,
    title: "GMX",
    chainlink: {
      "0xa4b1": "0xDB98056FecFff59D032aB628337A4887110df3dB",
      "0x1": "",
    },
    address: {
      "0x1": "",
      "0xa4b1": "0xfc5a1a6eb076a2c7ad06ed22c90d7e710e35ad0a",
    },
  },
};
export default TOKEN_LIST;
