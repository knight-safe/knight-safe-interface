export const wcNamespaces = (address) => ({
  eip155: {
    methods: [
      "eth_sendTransaction",
      "personal_sign",
      "eth_accounts",
      "eth_requestAccounts",
      "eth_sendRawTransaction",
      "eth_sign",
      "eth_signTransaction",
      "eth_signTypedData",
      "eth_signTypedData_v3",
      "eth_signTypedData_v4",
      "wallet_switchEthereumChain",
      "wallet_addEthereumChain",
      "wallet_getPermissions",
      "wallet_requestPermissions",
      "wallet_registerOnboarding",
      "wallet_watchAsset",
      "wallet_scanQRCode",
    ],
    chains: ["eip155:1", "eip155:5", "eip155:1271", "eip155:42161"],
    events: ["chainChanged", "accountsChanged", "connect", "disconnect"],
    accounts: [
      `eip155:1:${address}`,
      `eip155:5:${address}`,
      `eip155:1271:${address}`,
      `eip155:42161:${address}`,
    ],
  },
});

export const wcMetadata = {
  name: "Knight safe",
  description:
    "Customizable self custody solution to delegate and safeguard your wallet",
  url: "app.knightsafe.io",
  icons: ["https://app.knightsafe.io/knight-safe-icon.png"],
};
