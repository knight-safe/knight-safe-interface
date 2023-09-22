import React, { useState, useMemo } from "react";
import { styled } from "styled-components";
import { get } from "lodash";
import { Box } from "@mui/material";
import { useAccount, useNetwork } from "wagmi";
import chainIdMapping from "../constant/chainIdMapping";
import { convertChainId, minAddr } from "../utils/display";
import walletMapping from "../constant/walletMapping";
import ModalWalletDetail from "./ModalWalletDetail";

const WalletDisplayHead = ({ sx, canOpen }) => {
  const { address, isConnected, connector } = useAccount();
  const { chain: walletChain } = useNetwork();
  const chainId = useMemo(() => convertChainId(walletChain?.id), [walletChain]);
  const [openDetail, setOpenDetail] = useState(false);

  if (!isConnected) {
    return null;
  }

  return (
    <>
      <StyleLayer
        sx={{
          ...sx,
          cursor: canOpen ? "pointer" : "default",
          "&:hover": {
            background: canOpen ? "rgb(92 92 92 / 55%)" : "none",
          },
        }}
        onClick={() => canOpen && setOpenDetail(true)}
      >
        <div className="wallet-logo">
          <img src={get(walletMapping, `${connector?.id}.logo`)} alt="wallet" />
        </div>
        <div className="ac-info">
          <p>
            <span>{get(walletMapping, `${connector?.id}.title`)}</span>
            {chainId && <span>@{get(chainIdMapping, `${chainId}.title`)}</span>}
          </p>
          <p>
            {chainId && <span>{get(chainIdMapping, `${chainId}.short`)}</span>}:
            {minAddr(address)}
          </p>
        </div>
      </StyleLayer>
      <ModalWalletDetail open={openDetail} setOpen={setOpenDetail} />
    </>
  );
};

export default WalletDisplayHead;

const StyleLayer = styled(Box)`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  margin-right: 10px;
  position: relative;
  .wallet-logo {
    width: 30px;
    margin-right: 10px;
    img {
      width: 100%;
    }
  }
  .ac-info {
    font-size: 14px;
  }
  .ac-detail {
    position: absolute;
    top: 100%;
    right: 0;
  }
`;
