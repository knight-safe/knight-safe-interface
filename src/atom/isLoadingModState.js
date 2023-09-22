import { atom } from "recoil";

const isLoadingModState = atom({
  key: "isLoadingModState",
  default: false,
});

export default isLoadingModState;
