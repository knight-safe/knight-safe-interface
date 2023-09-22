import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";

const chains = [arbitrum, mainnet];
const projectId = process.env.REACT_APP_WALLET_CONNECT_ID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

export const metaMaskConnector = new MetaMaskConnector({
  chains,
  // options: {
  //   shimDisconnect: true,
  //   shimChainChangedDisconnect: true,
  // },
});
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [...w3mConnectors({ projectId, chains })],
  publicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);
