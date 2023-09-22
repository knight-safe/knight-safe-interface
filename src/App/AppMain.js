import React from "react";
import AppRoute from "./AppRoute";
import { useRecoilState } from "recoil";
import { Web3Modal } from "@web3modal/react";
import { get } from "lodash";
import ModalConnectWallet from "../component/ModalConnectWallet";
import ModalQrCode from "../component/ModalQrCode";
import ModalLoading from "../component/ModalLoading";
import ModalConfirm from "../component/ModalConfirm";
import { ethereumClient } from "../constant/wagmiState";
import chainState from "../atom/chainState";
import chainIdMapping from "../constant/chainIdMapping";

const AppMain = () => {
  const [chain] = useRecoilState(chainState);

  return (
    <div className="App">
      <AppRoute />
      <ModalConnectWallet />
      <ModalQrCode />
      <ModalLoading />
      <ModalConfirm />
      <Web3Modal
        projectId={process.env.REACT_APP_WALLET_CONNECT_ID}
        ethereumClient={ethereumClient}
        defaultChain={get(chainIdMapping, `${chain}.wagmiChain`)}
        themeMode="dark"
        themeVariables={{
          "--w3m-z-index": "1301",
        }}
      />
    </div>
  );
};

export default AppMain;
