import { atom } from "recoil";

const qrCodeModalState = atom({
  key: "qrCodeModalState",
  default: false,
});

export default qrCodeModalState;
