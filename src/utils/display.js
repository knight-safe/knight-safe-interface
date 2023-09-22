import {
  cloneDeep,
  filter,
  find,
  flatMap,
  get,
  isArray,
  isNil,
  keyBy,
  map,
  mapValues,
  pickBy,
  set,
  values,
} from "lodash";
import numbro from "numbro";
import { Tooltip } from "@mui/material";
import { toChecksumAddress } from "web3-utils";
import APP_LIST from "../constant/APP_LIST";
import TOKEN_LIST from "../constant/TOKEN_LIST";
import { ERROR_MESSAGE } from "../constant/ERROR_MESSAGE";
import iText from "../lang/en.json";

export const minAddr = (ac, f = 5, b = 4) => {
  if (isNil(ac)) {
    return "";
  }
  const len = ac.length;
  return `${ac.substring(0, f)}...${ac.substring(len - b, len)}`;
};

export const getAppWithFunc = (app, chainId) => {
  if (!isArray(app)) {
    return [];
  }
  const appData = pickBy(
    cloneDeep(APP_LIST),
    (e) => !!get(e, `platform.${chainId}`)
  );
  app.forEach((p) => {
    const sd = p.split("_");
    set(appData, `${sd[0]}.enable`, true);
    set(appData, `${sd[0]}.func.${sd[1]}`, true);
  });
  return appData;
};

export const getPriceToUsD = (balance, rate) => {
  if (isNaN(rate)) {
    return 0;
  }
  return Number(balance) * rate;
};

export const displayPrice = (balance, rate) => {
  const am = getPriceToUsD(balance, rate);
  if (am < 0.01 && am > 0) {
    return "< 0.01";
  }
  return numbro(am).format({ thousandSeparated: true, mantissa: 2 });
};
export const displayBalance = (balance) =>
  numbro(balance).format({ thousandSeparated: false, mantissa: 8 });

export const checkTokenIsOnlist = (addr, chain) =>
  Boolean(
    find(
      TOKEN_LIST,
      (e) =>
        !!e.address[chain] &&
        toChecksumAddress(e.address[chain]) === toChecksumAddress(addr)
    )
  );

export const convertAddr = (token, chain) =>
  mapValues(
    keyBy(
      filter(TOKEN_LIST, (tp) => get(tp, `address.${chain}`)).map(
        (p) => p.symbol
      ),
      (e) => e
    ),
    (x) => token.includes(x)
  );

export const getErrMsg = (name, er, options = {}) => {
  const e = JSON.parse(JSON.stringify(er));
  const opts = {
    defaultMessage: iText.SOME_ISSUE,
    errorMapper: ERROR_MESSAGE,
    ...options,
  };
  let msg;
  const txt = name + " failed";
  let code;
  if (get(e, "innerError.message")) {
    code = get(e, "innerError.message").split(": ")[1] || "";
    console.log("getErrMsg ~ code:", code);
    msg = opts.errorMapper[code];
  }
  const tx = e?.txHash || options.txHash;
  return (
    <p>
      {`${txt}: ${msg || opts.defaultMessage}`}
      {tx && (
        <a
          href={"https://arbiscan.io/tx/" + tx}
          target="_blank"
          rel="noreferrer"
          className="alert-link"
        >
          Details
        </a>
      )}

      {code && (
        <Tooltip title={`${iText.DETAILS_T}: ${code}`} placement="top-start">
          <span className="alert-link">{iText.DETAILS_T}</span>
        </Tooltip>
      )}
    </p>
  );
};

export const delay = (sec) => new Promise((r) => setTimeout(r, sec * 1000));

export const appWithFuncHasFunc = (appWithFunc) =>
  Boolean(flatMap(map(appWithFunc, (e) => values(e.func))).find((p) => !!p));

export const convertChainId = (id) => {
  if (!id) {
    return null;
  }
  return `0x${id.toString(16)}`.toLowerCase();
};
