import { toBigInt, hexToNumber } from "web3-utils";

const WhitelistContract = (a, b) => ({
  address: a,
  data: b,
});

const GMX_TRADE_CHECKER_ADDRESS = "0x705Eda3548726338CF55a6c673d2D7b8201B23e6";
const AAVE_LEND_CHECKER_ADDRESS = "0x6a8913D4D1984fb527a8897Df62eFe876563b64B";
const UNISWAP_SWAP_CHECKER_ADDRESS =
  "0x71e47D2602d96a834885a1304bF4179F62C28CBC";

const getCheckerParam = (addr) =>
  toBigInt(hexToNumber(addr, 16)) + toBigInt(Math.pow(2, 252));

const GMX_TRADE_CHECKER_PARAM = getCheckerParam(GMX_TRADE_CHECKER_ADDRESS);
const AAVE_LEND_CHECKER_PARAM = getCheckerParam(AAVE_LEND_CHECKER_ADDRESS);
const UNISWAP_SWAP_CHECKER_PARAM = getCheckerParam(
  UNISWAP_SWAP_CHECKER_ADDRESS
);

export const ARB_TOKEN_WHITELIST_MAP = {
  USDT: WhitelistContract(
    "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", // 0xf31e1AE27e7cd057C1D6795a5a083E0453D39B50
    {
      "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
      "0xa457c2d7": [1], // decreaseAllowance(spender:address,subtractedValue:uint256)
      "0x39509351": [1], // increaseAllowance(spender:address,addedValue:uint256)
      "0x1e89d545": [], // [99],  // multiTransfer(_recipients:address[],_values:uint256[])
      "0xd505accf": [1, 2], // permit(owner:address,spender:address,value:uint256,deadline:uint256,v:uint8,r:bytes32,s:bytes32)
      "0xa9059cbb": [1], // transfer(_recipient:address,_amount:uint256)
      "0x23b872dd": [2], // transferFrom(_sender:address,_recipient:address,_amount:uint256)
    }
  ),
  USDC: WhitelistContract(
    "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", // 0x0f4fb9474303d10905AB86aA8d5A65FE44b6E04A
    {
      "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
      "0x5a049a70": [1], // cancelAuthorization(authorizer:address,nonce:bytes32,v:uint8,r:bytes32,s:bytes32)
      "0xa457c2d7": [1], // decreaseAllowance(spender:address,decrement:uint256)
      "0x39509351": [1], // increaseAllowance(spender:address,addedValue:uint256)
      "0xd505accf": [1, 2], // permit(owner:address,spender:address,value:uint256,deadline:uint256,v:uint8,r:bytes32,s:bytes32)
      "0xef55bec6": [1, 2], // receiveWithAuthorization(from:address,to:address,value:uint256,validAfter:uint256,validBefore:uint256,nonce:bytes32,v:uint8,r:bytes32,s:bytes32)
      "0xa9059cbb": [1], // transfer(_recipient:address,_amount:uint256)
      "0x23b872dd": [1, 2], // transferFrom(_sender:address,_recipient:address,_amount:uint256)
      "0xe3ee160e": [1, 2], // transferWithAuthorization(from:address,to:address,value:uint256,validAfter:uint256,validBefore:uint256,nonce:bytes32,v:uint8,r:bytes32,s:bytes32)
    }
  ),
  "USDC.e": WhitelistContract(
    "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8", // 0x1eFB3f88Bc88f03FD1804A5C53b7141bbEf5dED8
    {
      "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
      "0xa457c2d7": [1], // decreaseAllowance(spender:address,subtractedValue:uint256)
      "0x39509351": [1], // increaseAllowance(spender:address,addedValue:uint256)
      "0xd505accf": [1, 2], // permit(owner:address,spender:address,value:uint256,deadline:uint256,v:uint8,r:bytes32,s:bytes32)
      "0xa9059cbb": [1], // transfer(_recipient:address,_amount:uint256)
      "0x4000aea0": [], // [99],  // transferAndCall(to:address,value:uint256,data:bytes)
      "0x23b872dd": [2], // transferFrom(_sender:address,_recipient:address,_amount:uint256)
    }
  ),
  DAI: WhitelistContract("0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", {
    "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
    "0xa457c2d7": [1], // decreaseAllowance(spender:address,subtractedValue:uint256)
    "0x39509351": [1], // increaseAllowance(spender:address,addedValue:uint256)
    "0xd505accf": [1, 2], // permit(owner:address,spender:address,value:uint256,deadline:uint256,v:uint8,r:bytes32,s:bytes32)
    "0xa9059cbb": [1], // transfer(_recipient:address,_amount:uint256)
    "0x23b872dd": [1, 2], // transferFrom(_sender:address,_recipient:address,_amount:uint256)
  }),
  WBTC: WhitelistContract(
    "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f", // 0x3f770Ac673856F105b586bb393d122721265aD46
    {
      "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
      "0xa457c2d7": [1], // decreaseAllowance(spender:address,subtractedValue:uint256)
      "0x39509351": [1], // increaseAllowance(spender:address,addedValue:uint256)
      "0xd505accf": [1, 2], // permit(owner:address,spender:address,value:uint256,deadline:uint256,v:uint8,r:bytes32,s:bytes32)
      "0xa9059cbb": [1], // transfer(_recipient:address,_amount:uint256)
      "0x4000aea0": [1], // transferAndCall(to:address,value:uint256,data:bytes)
      "0x23b872dd": [1, 2], // transferFrom(_sender:address,_recipient:address,_amount:uint256)
    }
  ),
  WETH: WhitelistContract(
    "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", // 0x8b194bEae1d3e0788A1a35173978001ACDFba668
    {
      "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
      "0xa457c2d7": [1], // decreaseAllowance(spender:address,subtractedValue:uint256)
      "0xd0e30db0": [0], // deposit()
      "0xb760faf9": [1], // depositTo(account:address)
      "0x39509351": [1], // increaseAllowance(spender:address,addedValue:uint256)
      "0xd505accf": [1, 2], // permit(owner:address,spender:address,value:uint256,deadline:uint256,v:uint8,r:bytes32,s:bytes32)
      "0xa9059cbb": [1], // transfer(_recipient:address,_amount:uint256)
      "0x4000aea0": [1], // transferAndCall(to:address,value:uint256,data:bytes)
      "0x23b872dd": [1, 2], // transferFrom(_sender:address,_recipient:address,_amount:uint256)
      "0x2e1a7d4d": [0], // withdraw(amount:uint256)
      "0x205c2878": [1], // withdrawTo(account:address,amount:uint256)
    }
  ),
  LINK: WhitelistContract(
    "0xf97f4df75117a78c1A5a0DBb814Af92458539FB4", // 0x3f770Ac673856F105b586bb393d122721265aD46
    {
      "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
      "0xa457c2d7": [1], // decreaseAllowance(spender:address,subtractedValue:uint256)
      "0x39509351": [1], // increaseAllowance(spender:address,addedValue:uint256)
      "0xd505accf": [1, 2], // permit(owner:address,spender:address,value:uint256,deadline:uint256,v:uint8,r:bytes32,s:bytes32)
      "0xa9059cbb": [1], // transfer(_recipient:address,_amount:uint256)
      "0x4000aea0": [1], // transferAndCall(to:address,value:uint256,data:bytes)
      "0x23b872dd": [1, 2], // transferFrom(_sender:address,_recipient:address,_amount:uint256)
    }
  ),
  UNI: WhitelistContract(
    "0xFa7F8980b0f1E64A2062791cc3b0871572f1F7f0", // 0x3f770Ac673856F105b586bb393d122721265aD46
    {
      "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
      "0xa457c2d7": [1], // decreaseAllowance(spender:address,subtractedValue:uint256)
      "0x39509351": [1], // increaseAllowance(spender:address,addedValue:uint256)
      "0xd505accf": [1, 2], // permit(owner:address,spender:address,value:uint256,deadline:uint256,v:uint8,r:bytes32,s:bytes32)
      "0xa9059cbb": [1], // transfer(_recipient:address,_amount:uint256)
      "0x4000aea0": [1], // transferAndCall(to:address,value:uint256,data:bytes)
      "0x23b872dd": [1, 2], // transferFrom(_sender:address,_recipient:address,_amount:uint256)
    }
  ),
  TUSD: WhitelistContract(
    "0x4D15a3A2286D883AF0AA1B3f21367843FAc63E07", // 0x3f770Ac673856F105b586bb393d122721265aD46
    {
      "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
      "0xa457c2d7": [1], // decreaseAllowance(spender:address,subtractedValue:uint256)
      "0x39509351": [1], // increaseAllowance(spender:address,addedValue:uint256)
      "0xd505accf": [1, 2], // permit(owner:address,spender:address,value:uint256,deadline:uint256,v:uint8,r:bytes32,s:bytes32)
      "0xa9059cbb": [1], // transfer(_recipient:address,_amount:uint256)
      "0x4000aea0": [1], // transferAndCall(to:address,value:uint256,data:bytes)
      "0x23b872dd": [1, 2], // transferFrom(_sender:address,_recipient:address,_amount:uint256)
    }
  ),
  ARB: WhitelistContract(
    "0x912CE59144191C1204E64559FE8253a0e49E6548", // 0xC4ed0A9Ea70d5bCC69f748547650d32cC219D882
    {
      "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
      "0xa457c2d7": [1], // decreaseAllowance(spender:address,subtractedValue:uint256)
      "0x5c19a95c": [1], // delegate(delegatee:address)
      "0xc3cda520": [1], // delegateBySig(delegatee:address,nonce:uint256,expiry:uint256,v:uint8,r:bytes32,s:bytes32)
      "0x39509351": [1], // increaseAllowance(spender:address,addedValue:uint256)
      "0xd505accf": [1, 2], // permit(owner:address,spender:address,value:uint256,deadline:uint256,v:uint8,r:bytes32,s:bytes32)
      "0xa9059cbb": [1], // transfer(_recipient:address,_amount:uint256)
      "0x4000aea0": [], // [99],  // transferAndCall(to:address,value:uint256,data:bytes)
      "0x23b872dd": [1, 2], // transferFrom(_sender:address,_recipient:address,_amount:uint256)
    }
  ),
  GRT: WhitelistContract(
    "0x9623063377AD1B27544C965cCd7342f7EA7e88C7", // 0xaFFCb96181D920FE8C0Af046C49B2c9eC98b28df
    {
      "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
      "0xa457c2d7": [1], // decreaseAllowance(spender:address,subtractedValue:uint256)
      "0x39509351": [1], // increaseAllowance(spender:address,addedValue:uint256)
      "0xd505accf": [1, 2], // permit(owner:address,spender:address,value:uint256,deadline:uint256,v:uint8,r:bytes32,s:bytes32)
      "0xa9059cbb": [1], // transfer(_recipient:address,_amount:uint256)
      "0x23b872dd": [1, 2], // transferFrom(_sender:address,_recipient:address,_amount:uint256)
    }
  ),
  FRAX: WhitelistContract("0x17FC002b466eEc40DaE837Fc4bE5c67993ddBd6F", {
    "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
    "0xa457c2d7": [1], // decreaseAllowance(spender:address,subtractedValue:uint256)
    "0x280cf3ed": [1], // exchangeCanonicalForOld(bridge_token_address:address,token_amount:uint256)
    "0x9006a50f": [1], // exchangeOldForCanonical(bridge_token_address:address,token_amount:uint256)
    "0x39509351": [1], // increaseAllowance(spender:address,addedValue:uint256)
    "0xd505accf": [1, 2], // permit(owner:address,spender:address,value:uint256,deadline:uint256,v:uint8,r:bytes32,s:bytes32)
    "0xa9059cbb": [1], // transfer(_recipient:address,_amount:uint256)
    "0x23b872dd": [1, 2], // transferFrom(_sender:address,_recipient:address,_amount:uint256)
  }),
  CRV: WhitelistContract(
    "0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978", // 0x3f770Ac673856F105b586bb393d122721265aD46
    {
      "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
      "0xa457c2d7": [1], // decreaseAllowance(spender:address,subtractedValue:uint256)
      "0x39509351": [1], // increaseAllowance(spender:address,addedValue:uint256)
      "0xd505accf": [1, 2], // permit(owner:address,spender:address,value:uint256,deadline:uint256,v:uint8,r:bytes32,s:bytes32)
      "0xa9059cbb": [1], // transfer(_recipient:address,_amount:uint256)
      "0x4000aea0": [1], // transferAndCall(to:address,value:uint256,data:bytes)
      "0x23b872dd": [1, 2], // transferFrom(_sender:address,_recipient:address,_amount:uint256)
    }
  ),
  GMX: WhitelistContract("0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a", {
    "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
    "0x1e83409a": [1], // claim(_receiver:address)
    "0xa9059cbb": [1], // transfer(_recipient:address,_amount:uint256)
    "0x23b872dd": [1, 2], // transferFrom(_sender:address,_recipient:address,_amount:uint256)
  }),
};

export const ARB_APP_FUNCTION_WHITELIST_MAP = {
  GMX_EARN: [
    WhitelistContract(
      "0xB95DB5B167D75e6d04227CfFFA61069348d271F5", // RewardRouterV2
      {
        "0x655603a4": [0], // acceptTransfer(_sender:address)
        "0x1af276a6": [], // batchCompoundForAccounts(_accounts:address[]) onlyGov
        "0x0db79e52": [], // batchStakeGmxForAccount(_accounts:address[],_amounts:uint256[]) onlyGov
        "0x4e71d92d": [0], // claim()
        "0x5fe3945f": [0], // claimEsGmx()
        "0xd294f093": [0], // claimFees()
        "0xf69e2046": [0], // compound()
        "0x2a9f4083": [1], // compoundForAccount(_account:address)
        "0x30b70002": [0], // handleRewards(_shouldClaimGmx:bool,_shouldStakeGmx:bool,_shouldClaimEsGmx:bool,_shouldStakeEsGmx:bool,_shouldStakeMultiplierPoints:bool,_shouldClaimWeth:bool,_shouldConvertWethToEth:bool)
        "0x2fdd983d": [], // initialize(_weth:address,_gmx:address,_esGmx:address,_bnGmx:address,_glp:address,_stakedGmxTracker:address,_bonusGmxTracker:address,_feeGmxTracker:address,_feeGlpTracker:address,_stakedGlpTracker:address,_glpManager:address,_gmxVester:address,_glpVester:address) onlyGov
        "0x364e2311": [1], // mintAndStakeGlp(_token:address,_amount:uint256,_minUsdg:uint256,_minGlp:uint256)
        "0x53a8aa03": [0], // mintAndStakeGlpETH(_minUsdg:uint256,_minGlp:uint256)
        "0xcfad57a2": [1], // setGov(_gov:address)
        "0xef9aacfd": [1], // signalTransfer(_receiver:address)
        "0xef8c5994": [0], // stakeEsGmx(_amount:uint256)
        "0xf3daeacc": [0], // stakeGmx(_amount:uint256)
        "0x5da4b8dd": [1], // stakeGmxForAccount(_account:address,_amount:uint256)
        "0x0f3aa554": [1, 4], // unstakeAndRedeemGlp(_tokenOut:address,_glpAmount:uint256,_minOut:uint256,_receiver:address)
        "0xabb5e5e2": [3], // unstakeAndRedeemGlpETH(_glpAmount:uint256,_minOut:uint256,_receiver:address)
        "0x64f64467": [0], // unstakeEsGmx(_amount:uint256)
        "0x078580d2": [0], // unstakeGmx(_amount:uint256)
        "0x01e33667": [1, 2], // withdrawToken(_token:address,_account:address,_amount:uint256)
      }
    ),
    WhitelistContract(
      "0xA906F338CB21815cBc4Bc87ace9e68c87eF8d8F1", // RewardRouterV2
      {
        "0x655603a4": [0], // acceptTransfer(_sender:address)
        "0x1af276a6": [], // batchCompoundForAccounts(_accounts:address[]) onlyGov
        "0x0db79e52": [], // batchStakeGmxForAccount(_accounts:address[],_amounts:uint256[]) onlyGov
        "0x4e71d92d": [0], // claim()
        "0x5fe3945f": [0], // claimEsGmx()
        "0xd294f093": [0], // claimFees()
        "0xf69e2046": [0], // compound()
        "0x2a9f4083": [1], // compoundForAccount(_account:address)
        "0x30b70002": [0], // handleRewards(_shouldClaimGmx:bool,_shouldStakeGmx:bool,_shouldClaimEsGmx:bool,_shouldStakeEsGmx:bool,_shouldStakeMultiplierPoints:bool,_shouldClaimWeth:bool,_shouldConvertWethToEth:bool)
        "0x2fdd983d": [], // initialize(_weth:address,_gmx:address,_esGmx:address,_bnGmx:address,_glp:address,_stakedGmxTracker:address,_bonusGmxTracker:address,_feeGmxTracker:address,_feeGlpTracker:address,_stakedGlpTracker:address,_glpManager:address,_gmxVester:address,_glpVester:address) onlyGov
        "0x364e2311": [1], // mintAndStakeGlp(_token:address,_amount:uint256,_minUsdg:uint256,_minGlp:uint256)
        "0x53a8aa03": [0], // mintAndStakeGlpETH(_minUsdg:uint256,_minGlp:uint256)
        "0xcfad57a2": [1], // setGov(_gov:address)
        "0xef9aacfd": [1], // signalTransfer(_receiver:address)
        "0xef8c5994": [0], // stakeEsGmx(_amount:uint256)
        "0xf3daeacc": [0], // stakeGmx(_amount:uint256)
        "0x5da4b8dd": [1], // stakeGmxForAccount(_account:address,_amount:uint256)
        "0x0f3aa554": [1, 4], // unstakeAndRedeemGlp(_tokenOut:address,_glpAmount:uint256,_minOut:uint256,_receiver:address)
        "0xabb5e5e2": [3], // unstakeAndRedeemGlpETH(_glpAmount:uint256,_minOut:uint256,_receiver:address)
        "0x64f64467": [0], // unstakeEsGmx(_amount:uint256)
        "0x078580d2": [0], // unstakeGmx(_amount:uint256)
        "0x01e33667": [1, 2], // withdrawToken(_token:address,_account:address,_amount:uint256)
      }
    ),
    WhitelistContract(
      "0x3963FfC9dff443c2A94f21b129D429891E32ec18", // GLP_Manager
      {
        "0x1ece366a": [1], // addLiquidity(_token:address,_amount:uint256,_minUsdg:uint256,_minGlp:uint256)
        "0x17eb2a15": [1, 2, 3], // addLiquidityForAccount(_fundingAccount:address,_account:address,_token:address,_amount:uint256,_minUsdg:uint256,_minGlp:uint256)
        "0x8fed0b2c": [1, 4], // removeLiquidity(_tokenOut:address,_glpAmount:uint256,_minOut:uint256,_receiver:address)
        "0x71d597ad": [1, 2, 5], // removeLiquidityForAccount(_account:address,_tokenOut:address,_glpAmount:uint256,_minOut:uint256,_receiver:address)
        "0x9116c4ae": [0], // setAumAdjustment(_aumAddition:uint256,_aumDeduction:uint256)
        "0x966be075": [0], // setCooldownDuration(_cooldownDuration:uint256)
        "0xcfad57a2": [1], // setGov(_gov:address)
        "0x9cb7de4b": [1], // setHandler(_handler:address,_isActive:bool)
        "0x6a86da19": [0], // setInPrivateMode(_inPrivateMode:bool)
        "0xd34ee093": [1], // setShortsTracker(_shortsTracker:address)
        "0x4f5f6b5e": [0], // setShortsTrackerAveragePriceWeight(_shortsTrackerAveragePriceWeight:uint256)
      }
    ),
  ],
  GMX_TRADE: [
    WhitelistContract(
      "0xaBBc5F99639c9B6bCb58544ddf04EFA6802F4064", // GMX Router
      {
        "0xd8867fc8": [1], // addPlugin(_plugin:address)
        "0x38c74dd9": [1], // approvePlugin(_plugin:address)
        "0x90205d8c": [1, 2, 6], // decreasePosition(_collateralToken:address,_indexToken:address,_collateralDelta:uint256,_sizeDelta:uint256,_isLong:bool,_receiver:address,_price:uint256)
        "0x5fc8500e": [GMX_TRADE_CHECKER_PARAM, 2, 6], // decreasePositionAndSwap(_path:address[],_indexToken:address,_collateralDelta:uint256,_sizeDelta:uint256,_isLong:bool,_receiver:address,_price:uint256,_minOut:uint256)
        "0x3039e37f": [GMX_TRADE_CHECKER_PARAM, 2, 6], // decreasePositionAndSwapETH(_path:address[],_indexToken:address,_collateralDelta:uint256,_sizeDelta:uint256,_isLong:bool,_receiver:address,_price:uint256,_minOut:uint256)
        "0x430ed37c": [1, 2, 6], // decreasePositionETH(_collateralToken:address,_indexToken:address,_collateralDelta:uint256,_sizeDelta:uint256,_isLong:bool,_receiver:address,_price:uint256)
        "0xcedd4375": [1], // denyPlugin(_plugin:address)
        "0x90b64ad3": [1], // directPoolDeposit(_token:address,_amount:uint256)
        "0xb7ddc992": [GMX_TRADE_CHECKER_PARAM, 2], // increasePosition(_path:address[],_indexToken:address,_amountIn:uint256,_minOut:uint256,_sizeDelta:uint256,_isLong:bool,_price:uint256)
        "0xb32755de": [GMX_TRADE_CHECKER_PARAM, 2], // increasePositionETH(_path:address[],_indexToken:address,_minOut:uint256,_sizeDelta:uint256,_isLong:bool,_price:uint256)
        "0x2662166b": [1, 2, 3, 7], // pluginDecreasePosition(_account:address,_collateralToken:address,_indexToken:address,_collateralDelta:uint256,_sizeDelta:uint256,_isLong:bool,_receiver:address)
        "0x1f1dd176": [1, 2, 3], // pluginIncreasePosition(_account:address,_collateralToken:address,_indexToken:address,_sizeDelta:uint256,_isLong:bool)
        "0x1b827878": [1, 2, 3], // pluginTransfer(_token:address,_account:address,_receiver:address,_amount:uint256)
        "0xa4d95b64": [1], // removePlugin(_plugin:address)
        "0xcfad57a2": [1], // setGov(_gov:address)
        "0x6023e966": [GMX_TRADE_CHECKER_PARAM, 4], // swap(_path:address[],_amountIn:uint256,_minOut:uint256,_receiver:address)
        "0xabe68eaa": [GMX_TRADE_CHECKER_PARAM, 3], // swapETHToTokens(_path:address[],_minOut:uint256,_receiver:address)
        "0x2d4ba6a7": [GMX_TRADE_CHECKER_PARAM, 4], // swapTokensToETH(_path:address[],_amountIn:uint256,_minOut:uint256,_receiver:address)
      }
    ),
    WhitelistContract(
      "0xb87a436B93fFE9D75c5cFA7bAcFff96430b09868", // PositionRouter
      {
        "0xe1f21c67": [1, 2], // approve(_token:address,_spender:address,_amount:uint256)
        "0x60a362e2": [2], // cancelDecreasePosition(_key:bytes32,_executionFeeReceiver:address)
        "0x225fc9fd": [2], // cancelIncreasePosition(_key:bytes32,_executionFeeReceiver:address)
        "0x7be7d141": [GMX_TRADE_CHECKER_PARAM, 2, 6], // createDecreasePosition(_path:address[],_indexToken:address,_collateralDelta:uint256,_sizeDelta:uint256,_isLong:bool,_receiver:address,_acceptablePrice:uint256,_minOut:uint256,_executionFee:uint256,_withdrawETH:bool,_callbackTarget:address)
        "0xf2ae372f": [GMX_TRADE_CHECKER_PARAM, 2], // createIncreasePosition(_path:address[],_indexToken:address,_amountIn:uint256,_minOut:uint256,_sizeDelta:uint256,_isLong:bool,_acceptablePrice:uint256,_executionFee:uint256,_referralCode:bytes32,_callbackTarget:address)
        "0x5b88e8c6": [GMX_TRADE_CHECKER_PARAM, 2], // createIncreasePositionETH(_path:address[],_indexToken:address,_minOut:uint256,_sizeDelta:uint256,_isLong:bool,_acceptablePrice:uint256,_executionFee:uint256,_referralCode:bytes32,_callbackTarget:address)
        "0x0d4d003d": [2], // executeDecreasePosition(_key:bytes32,_executionFeeReceiver:address)
        "0xf3883d8b": [2], // executeDecreasePositions(_endIndex:uint256,_executionFeeReceiver:address)
        "0x27b42c0f": [2], // executeIncreasePosition(_key:bytes32,_executionFeeReceiver:address)
        "0x9a208100": [2], // executeIncreasePositions(_endIndex:uint256,_executionFeeReceiver:address)
        "0x62f8a3fe": [1], // getRequestKey(_account:address,_index:uint256)
        "0x24a084df": [1], // sendValue(_receiver:address,_amount:uint256)
        "0x704b6c02": [1], // setAdmin(_admin:address)
        "0x8a54942f": [0], // setCallbackGasLimit(_callbackGasLimit:uint256)
        "0x4067b132": [0], // setDelayValues(_minBlockDelayKeeper:uint256,_minTimeDelayPublic:uint256,_maxTimeDelay:uint256)
        "0x490ae210": [0], // setDepositFee(_depositFee:uint256)
        "0xcfad57a2": [1], // setGov(_gov:address)
        "0x233bfe3b": [0], // setIncreasePositionBufferBps(_increasePositionBufferBps:uint256)
        "0x7c2eb9f7": [0], // setIsLeverageEnabled(_isLeverageEnabled:bool)
        "0xef12c67e": [], // setMaxGlobalSizes(_tokens:address[],_longSizes:uint256[],_shortSizes:uint256[]) onlyAdmin
        "0xfc2cee62": [0], // setMinExecutionFee(_minExecutionFee:uint256)
        "0x3422ead1": [1], // setPositionKeeper(_account:address,_isActive:bool)
        "0xae4d7f9a": [1], // setReferralStorage(_referralStorage:address)
        "0x308aa81f": [0], // setRequestKeysStartValues(_increasePositionRequestKeysStart:uint256,_decreasePositionRequestKeysStart:uint256)
        "0xf2555278": [1, 2], // withdrawFees(_token:address,_receiver:address)
      }
    ),
    WhitelistContract(
      "0x09f77E8A13De9a35a7231028187e9fD5DB8a2ACB", // OrderBook
      {
        "0x9e71b0f0": [0], // cancelDecreaseOrder(_orderIndex:uint256)
        "0x47e0bbd0": [0], // cancelIncreaseOrder(_orderIndex:uint256)
        "0x807c5600": [0], // cancelMultiple(_swapOrderIndexes:uint256[],_increaseOrderIndexes:uint256[],_decreaseOrderIndexes:uint256[])
        "0xf882ac07": [0], // cancelSwapOrder(_orderIndex:uint256)
        "0xc16cde8a": [1, 3], // createDecreaseOrder(_indexToken:address,_sizeDelta:uint256,_collateralToken:address,_collateralDelta:uint256,_isLong:bool,_triggerPrice:uint256,_triggerAboveThreshold:bool)
        "0xb142a4b0": [GMX_TRADE_CHECKER_PARAM, 3, 6], // createIncreaseOrder(_path:address[],_amountIn:uint256,_indexToken:address,_minOut:uint256,_sizeDelta:uint256,_collateralToken:address,_isLong:bool,_triggerPrice:uint256,_triggerAboveThreshold:bool,_executionFee:uint256,_shouldWrap:bool)
        "0x269ae6c2": [GMX_TRADE_CHECKER_PARAM], // createSwapOrder(_path:address[],_amountIn:uint256,_minOut:uint256,_triggerRatio:uint256,_triggerAboveThreshold:bool,_executionFee:uint256,_shouldWrap:bool,_shouldUnwrap:bool)
        "0x11d9444a": [1, 3], // executeDecreaseOrder(_address:address,_orderIndex:uint256,_feeReceiver:address)
        "0xd38ab519": [1, 3], // executeIncreaseOrder(_address:address,_orderIndex:uint256,_feeReceiver:address)
        "0x07c7edc3": [1, 3], // executeSwapOrder(_account:address,_orderIndex:uint256,_feeReceiver:address)
        "0xd7c41c79": [], // initialize(_router:address,_vault:address,_weth:address,_usdg:address,_minExecutionFee:uint256,_minPurchaseTokenAmountUsd:uint256) onlyGov
        "0xcfad57a2": [1], // setGov(_gov:address)
        "0xfc2cee62": [0], // setMinExecutionFee(_minExecutionFee:uint256)
        "0x0d5cc938": [0], // setMinPurchaseTokenAmountUsd(_minPurchaseTokenAmountUsd:uint256)
        "0xa397ea54": [0], // updateDecreaseOrder(_orderIndex:uint256,_collateralDelta:uint256,_sizeDelta:uint256,_triggerPrice:uint256,_triggerAboveThreshold:bool)
        "0x9983ee1b": [0], // updateIncreaseOrder(_orderIndex:uint256,_sizeDelta:uint256,_triggerPrice:uint256,_triggerAboveThreshold:bool)
        "0xc86b0f7d": [0], // updateSwapOrder(_orderIndex:uint256,_minOut:uint256,_triggerRatio:uint256,_triggerAboveThreshold:bool)
      }
    ),
  ],
  AAVE_LEND: [
    WhitelistContract(
      "0x794a61358D6845594F94dc1DB02A252b5b4814aD", // Pool V3 [x]
      {
        "0xd65dc7a1": [1], // backUnbacked(asset:address,amount:uint256,fee:uint256)
        "0xa415bcad": [1, 5], // borrow(asset:address,amount:uint256,interestRateMode:uint256,referralCode:uint16,onBehalfOf:address)
        "0xd5eed868": [AAVE_LEND_CHECKER_PARAM], // borrow(args:bytes32)
        "0x74eb89ac": [], // configureEModeCategory(id:uint8,category:tuple) onlyPoolConfigurator
        "0xe8eda9df": [1, 3], // deposit(asset:address,amount:uint256,onBehalfOf:address,referralCode:uint16)
        "0x63c9b860": [1], // dropReserve(asset:address)
        "0xd5ed3933": [1, 2, 3], // finalizeTransfer(asset:address,from:address,to:address,amount:uint256,balanceFromBefore:uint256,balanceToBefore:uint256)
        "0xab9c4b5d": [], // [99, 1, 5], // flashLoan(receiverAddress:address,assets:address[],amounts:uint256[],interestRateModes:uint256[],onBehalfOf:address,params:bytes,referralCode:uint16)
        "0x42b0b77c": [], // [99, 1, 2], // flashLoanSimple(receiverAddress:address,asset:address,amount:uint256,params:bytes,referralCode:uint16)
        "0x7a708e92": [1, 2, 3, 4, 5], // initReserve(asset:address,aTokenAddress:address,stableDebtAddress:address,variableDebtAddress:address,interestRateStrategyAddress:address)
        "0xc4d66de8": [1], // initialize(provider:address)
        "0x00a718a9": [1, 2, 3], // liquidationCall(collateralAsset:address,debtAsset:address,user:address,debtToCover:uint256,receiveAToken:bool)
        "0xfd21ecff": [AAVE_LEND_CHECKER_PARAM], // liquidationCall(args1:bytes32,args2:bytes32)
        "0x9cd19996": [AAVE_LEND_CHECKER_PARAM], // mintToTreasury(assets:address[])
        "0x69a933a5": [1, 3], // mintUnbacked(asset:address,amount:uint256,onBehalfOf:address,referralCode:uint16)
        "0x427da177": [AAVE_LEND_CHECKER_PARAM], // rebalanceStableBorrowRate(args:bytes32)
        "0xcd112382": [1, 2], // rebalanceStableBorrowRate(asset:address,user:address)
        "0x563dd613": [AAVE_LEND_CHECKER_PARAM], // repay(args:bytes32)
        "0x573ade81": [1, 4], // repay(asset:address,amount:uint256,interestRateMode:uint256,onBehalfOf:address)
        "0x2dad97d4": [1], // repayWithATokens(asset:address,amount:uint256,interestRateMode:uint256)
        "0xdc7c0bff": [AAVE_LEND_CHECKER_PARAM], // repayWithATokens(args:bytes32)
        "0x94b576de": [], // Permit not supported [99],  // repayWithPermit(args:bytes32,r:bytes32,s:bytes32)
        "0xee3e210b": [], // Permit not supported [1, 4], // repayWithPermit(asset:address,amount:uint256,interestRateMode:uint256,onBehalfOf:address,deadline:uint256,permitV:uint8,permitR:bytes32,permitS:bytes32)
        "0xcea9d26f": [1, 2], // rescueTokens(token:address,to:address,amount:uint256)
        "0xe43e88a1": [1], // resetIsolationModeTotalDebt(asset:address)
        "0x5b1048bb": [], // setConfiguration(asset:address,configuration:tuple) onlyPoolConfigurator
        "0x1d2118f9": [1, 2], // setReserveInterestRateStrategyAddress(asset:address,rateStrategyAddress:address)
        "0x28530a47": [0], // setUserEMode(categoryId:uint8)
        "0x4d013f03": [AAVE_LEND_CHECKER_PARAM], // setUserUseReserveAsCollateral(args:bytes32)
        "0x5a3b74b9": [1], // setUserUseReserveAsCollateral(asset:address,useAsCollateral:bool)
        "0x617ba037": [1, 3], // supply(asset:address,amount:uint256,onBehalfOf:address,referralCode:uint16)
        "0xf7a73840": [AAVE_LEND_CHECKER_PARAM], // supply(args:bytes32)
        "0x02c205f0": [], // Permit not supported [99, 1, 3], // supplyWithPermit(asset:address,amount:uint256,onBehalfOf:address,referralCode:uint16,deadline:uint256,permitV:uint8,permitR:bytes32,permitS:bytes32)
        "0x680dd47c": [], // Permit not supported [99],  // supplyWithPermit(args:bytes32,r:bytes32,s:bytes32)
        "0x1fe3c6f3": [AAVE_LEND_CHECKER_PARAM], // swapBorrowRateMode(args:bytes32)
        "0x94ba89a2": [1], // swapBorrowRateMode(asset:address,interestRateMode:uint256)
        "0x3036b439": [0], // updateBridgeProtocolFee(protocolFee:uint256)
        "0xbcb6e522": [0], // updateFlashloanPremiums(flashLoanPremiumTotal:uint128,flashLoanPremiumToProtocol:uint128)
        "0x69328dec": [1, 3], // withdraw(asset:address,amount:uint256,to:address)
        "0x8e19899e": [AAVE_LEND_CHECKER_PARAM], // withdraw(args:bytes32)
      }
    ),
    WhitelistContract(
      "0xB5Ee21786D28c5Ba61661550879475976B707099", // Wrapped Token Gateway V3
      {
        "0x66514c97": [0], // borrowETH(:address,amount:uint256,interesRateMode:uint256,referralCode:uint16)
        "0x474cf53d": [2], // depositETH(:address,onBehalfOf:address,referralCode:uint16)
        "0xeed88b8d": [1], // emergencyEtherTransfer(to:address,amount:uint256)
        "0xa3d5b255": [1, 2], // emergencyTokenTransfer(token:address,to:address,amount:uint256)
        "0x715018a6": [0], // renounceOwnership()
        "0x02c5fcf8": [4], // repayETH(:address,amount:uint256,rateMode:uint256,onBehalfOf:address)
        "0xf2fde38b": [1], // transferOwnership(newOwner:address)
        "0x80500d20": [3], // withdrawETH(:address,amount:uint256,to:address)
        "0xd4c40b6c": [3], // withdrawETHWithPermit(:address,amount:uint256,to:address,deadline:uint256,permitV:uint8,permitR:bytes32,permitS:bytes32)
      }
    ),
    WhitelistContract(
      "0xCf85FF1c37c594a10195F7A9Ab85CBb0a03f69dE", // For ParaSwapDebtSwapAdapterV3 [x]
      {
        "0x920f5c84": [], // [99],  // executeOperation(assets:address[],amounts:uint256[],:uint256[],initiator:address,params:bytes)
        "0x0a036351": [1], // renewAllowance(reserve:address)
        "0x715018a6": [0], // renounceOwnership()
        "0x00ae3bf8": [1], // rescueTokens(token:address)
        "0x636aa619": [], // [99],  // swapDebt(debtSwapParams:tuple,creditDelegationPermit:tuple)
        "0xf2fde38b": [1], // transferOwnership(newOwner:address)
      }
    ),
    WhitelistContract(
      "0xF3C3F14dd7BDb7E03e6EBc3bc5Ffc6D66De12251", // For ParaSwapLiquiditySwapAdapter [x]
      {
        "0x1b11d0ff": [], // [99,1,4], // executeOperation(asset:address,amount:uint256,premium:uint256,initiator:address,params:bytes)
        "0x715018a6": [0], // renounceOwnership()
        "0x00ae3bf8": [1], // rescueTokens(token:address)
        "0xd3454a35": [], // [99,1,2,7], // swapAndDeposit(assetToSwapFrom:address,assetToSwapTo:address,amountToSwap:uint256,minAmountToReceive:uint256,swapAllBalanceOffset:uint256,swapCalldata:bytes,augustus:address,permitParams:tuple)
        "0xf2fde38b": [1], // transferOwnership(newOwner:address)
      }
    ),
    WhitelistContract(
      "0x0c84331e39d6658Cd6e6b9ba04736cC4c4734351", // For approveDelegation [x]
      {
        "0xc04a8a10": [1], // approveDelegation(delegatee:address,amount:uint256)
      }
    ),
    WhitelistContract(
      "0xe50fA9b3c56FfB159cB0FCA61F5c9D750e8128c8", // aWETH Token v3
      {
        "0x095ea7b3": [1], // approve(_spender:address,_amount:uint256)
      }
    ),
  ],
  UNISWAP_SWAP: [
    WhitelistContract(
      "0x000000000022D473030F116dDEE9F6B43aC78BA3", // Permit2 [x]
      {
        "0x87517c45": [1, 2], // approve(token:address,spender:address,amount:uint160,expiration:uint48)
        "0x65d9723c": [1, 2], // invalidateNonces(token:address,spender:address,newNonce:uint48)
        "0x3ff9dcb1": [0], // invalidateUnorderedNonces(wordPos:uint256,mask:uint256)
        "0xab1bc1f8": [], // [99],  // lockdown(approvals:tuple[])
        "0xe4d1b8e4": [], // [99],  // permit(owner:address,permitBatch:tuple,signature:bytes) / permit(owner:address,permitSingle:tuple,signature:bytes)
        "0x8c1b8baa": [], // [99],  // permitTransferFrom(permit:tuple,transferDetails:tuple,owner:address,signature:bytes)
        "0xd8ea8a80": [], // [99],  // permitTransferFrom(permit:tuple,transferDetails:tuple[],owner:address,signature:bytes)
        "0x9f97ecd0": [], // [99],  // permitWitnessTransferFrom(permit:tuple,transferDetails:tuple,owner:address,witness:bytes32,witnessTypeString:string,signature:bytes)
        "0xcec4be07": [], // [99],  // permitWitnessTransferFrom(permit:tuple,transferDetails:tuple[],owner:address,witness:bytes32,witnessTypeString:string,signature:bytes)
        "0x855a2299": [], // [99],  // transferFrom(transferDetails:tuple[])
        "0x36c78516": [1, 2, 4], // transferFrom(from:address,to:address,amount:uint160,token:address)
      }
    ),
    WhitelistContract(
      "0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD", // UniversalRouter [x]
      {
        "0x709a1cc2": [], // [99],  // collectRewards(looksRareClaim:bytes)
        "0x24856bc3": [UNISWAP_SWAP_CHECKER_PARAM], // execute(commands:bytes,inputs:bytes[])
        "0x3593564c": [UNISWAP_SWAP_CHECKER_PARAM], // execute(commands:bytes,inputs:bytes[],deadline:uint256)
        "0xbc197c81": [0], // onERC1155BatchReceived(:address,:address,:uint256[],:uint256[],:bytes)
        "0xf23a6e61": [0], // onERC1155Received(:address,:address,:uint256,:uint256,:bytes)
        "0x150b7a02": [0], // onERC721Received(:address,:address,:uint256,:bytes)
        "0x01ffc9a7": [0], // supportsInterface(interfaceId:bytes4)
        "0xfa461e33": [], // [99],  // uniswapV3SwapCallback(amount0Delta:int256,amount1Delta:int256,data:bytes)
      }
    ),
  ],
};
