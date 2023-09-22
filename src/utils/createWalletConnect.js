import { Core } from "@walletconnect/core";
import { Web3Wallet } from "@walletconnect/web3wallet";
import { getSdkError } from "@walletconnect/utils";
import { wcMetadata } from "../constant/walletConnectNamespaces";

export let web3wallet;
export let core;

export async function createWeb3Wallet(relayerRegionURL) {
  core = new Core({
    projectId: process.env.REACT_APP_WALLET_CONNECT_ID,
  });

  web3wallet = await Web3Wallet.init({
    core,
    metadata: { ...wcMetadata, url: window.location.hostname },
  });
  return web3wallet;
}

export const disconnectAllWC = async () => {
  if (!web3wallet) {
    return;
  }
  const actSes = await web3wallet.getActiveSessions();
  await Promise.all(Object.values(actSes).map(web3wallet.disconnectSession));
};
