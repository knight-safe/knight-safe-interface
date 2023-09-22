import { atom } from "recoil";

const chainState = atom({
  key: "chainState",
  default: "0xa4b1",
});

export default chainState;
