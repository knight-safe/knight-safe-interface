import { isNil, pull } from "lodash";

export const ADDRESS_STORE = "ks:address";
export const CHAIN_STORE = "ks:chain";
export const Auto_FETCH_STORE = "ks:auto_fetch";

export const setAddressStore = (addr) => {
  const lad = localStorage.getItem(ADDRESS_STORE);
  let addrList = [];
  if (lad) {
    addrList = lad.split(",");
    addrList = pull(addrList, addr);
    addrList = [addr, ...addrList];
  } else {
    addrList = [addr];
  }
  const localAddr = addrList.join(",");
  localStorage.setItem(ADDRESS_STORE, localAddr);
};

export const getAddressOptions = (limit) => {
  const lad = localStorage.getItem(ADDRESS_STORE);
  if (!lad) {
    return [];
  }
  const arr = lad.split(",");
  if (!isNil(limit)) {
    return arr.slice(0, limit);
  }
  return arr;
};
