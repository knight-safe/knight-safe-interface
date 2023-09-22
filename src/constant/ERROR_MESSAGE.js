export const ERROR_MESSAGE = {
  "Task failed": "if inner transaction return failed",
  "Insufficient amount to refund gas spent":
    "when trying to refund gas spent to trade, not enough eth to refund",
  "To address not in whitelist":
    "The interacting contract address is not in the whitelist",
  "Selector not in whitelist":
    "The 4-bytes function selector (function ID) is not in the whitelist",
  "Parameter Checker should not return empty list":
    "External parameter checker contract call return with an empty list (unexpected)",
  "Parameter address not in whitelist":
    "One or more addresses in the parameter is not in the whitelist",

  "can only setup once": "Setup is called more than once",
  "owner cannot be null address":
    "null address is used as owner during the setup",
  "Owner only": "A function for owner only called by a non-owner address",
  "Not proposed new owner": "Non owner trying to call an owner only function",

  "Trader address is invalid":
    "Null or address(1) is entered in update trader list functions but these address should be prohibited",
  "New trader already in trader list":
    "Trying to add a new trader but that address is already in the trader list",
  "Trader only": "Non trader trying to call a trader only function",
  "Trader is not in trader list":
    "Trying to remove a non existing trader from the trader list",

  "Input arrays do not have the same length":
    'The parameter of adding new whitelist should have equal length of arrays "selector" and "parameters"',
  "Input address is invalid":
    "Null or address(1) is entered in update whitelist functions but these address should be prohibited",
  "Input address is not in the whitelist":
    "Trying to remove a non existing whitelist address from the whitelist",

  "invalid signature length":
    "Length of the signature to be verified is not at the length of 65",

  "Implementation address should not be null":
    "Creating a wallet with null proxy address",
  transcation_reverted: "Transcation reverted.",
};

export const ASSETS_PAGE_ERROR_MESSAGE = {
  ...ERROR_MESSAGE,
  "To address not in whitelist": "Token not in whitelist",
  "Parameter address not in whitelist": "Recipient not in whitelist",
};
