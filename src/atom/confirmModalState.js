import { atom } from "recoil";

const confirmModalState = atom({
  key: "confirmModalState",
  default: false,
});

// title
// message
// yes
// no

export default confirmModalState;
