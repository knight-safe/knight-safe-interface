import { atom } from "recoil";

const mobileMenuState = atom({
  key: "mobileMenuState",
  default: false,
});

export default mobileMenuState;
