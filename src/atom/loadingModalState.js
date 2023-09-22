import { atom } from "recoil";

const loadingModalState = atom({
  key: "loadingModalState",
  default: false,
});

export default loadingModalState;
