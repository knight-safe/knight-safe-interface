import { Box, Button, Grid, IconButton, Modal } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import connectModalState from "../atom/connectModalState";
import { AiOutlineCloseCircle } from "react-icons/ai";
import walletMapping from "../constant/walletMapping";
import { get, isArray } from "lodash";
import { useTranslation } from "react-i18next";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useMemo } from "react";

const ModalConnectWallet = () => {
  const [open, setOpen] = useRecoilState(connectModalState);
  const { t } = useTranslation();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();

  const { isConnected } = useAccount();

  const mmConnector = useMemo(
    () =>
      isArray(connectors)
        ? connectors.find((c) => c?.id === "injected")
        : undefined,
    [connectors]
  );
  const wcConnector = useMemo(
    () =>
      isArray(connectors)
        ? connectors.find((c) => c?.id === "walletConnect")
        : undefined,
    [connectors]
  );

  useEffect(() => {
    if (isConnected) {
      setOpen(false);
    }
  }, [isConnected, setOpen]);

  const onConnectMM = useCallback(async () => {
    await connect({ connector: mmConnector });
  }, [connect, mmConnector]);

  const { open: openWeb3 } = useWeb3Modal();

  return (
    <StyleLayer open={open} onClose={() => setOpen(false)}>
      <Box className="mod-content">
        <h2>
          {t("AVA_WAL")} ({connectors.filter((d) => d.ready).length})
        </h2>
        <Grid container spacing={2} className="wal-list">
          {mmConnector?.ready && (
            <Grid item xs={6}>
              <Button
                variant="outlined"
                onClick={onConnectMM}
                disabled={!mmConnector.ready}
              >
                <img
                  src={get(walletMapping, `${mmConnector.id}.logo`)}
                  alt={mmConnector.name}
                />
                <span>{mmConnector.name}</span>
              </Button>
            </Grid>
          )}
          {wcConnector?.ready && (
            <Grid item xs={6}>
              <Button variant="outlined" onClick={openWeb3}>
                <img
                  src={get(walletMapping, `${wcConnector.id}.logo`)}
                  alt={wcConnector.name}
                />
                <span>{wcConnector.name}</span>
              </Button>
            </Grid>
          )}
        </Grid>
        <IconButton className="close-btn" onClick={() => setOpen(false)}>
          <AiOutlineCloseCircle />
        </IconButton>
      </Box>
    </StyleLayer>
  );
};

export default ModalConnectWallet;

const StyleLayer = styled(Modal)`
  .wal-list {
    margin-top: 15px;
    button {
      width: 100%;
      text-align: left;
      text-transform: none;
      padding-top: 8px;
      padding-bottom: 8px;
      border-color: #fff;
      color: #fff;

      img {
        width: 30px;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
`;
