import React, { useCallback, useMemo } from "react";
import { Box, Button, IconButton, Modal, TextField } from "@mui/material";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import { FiCopy } from "react-icons/fi";
import { get } from "lodash";
import { useAccount, useDisconnect, useNetwork } from "wagmi";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";
import walletMapping from "../constant/walletMapping";
import chainIdMapping from "../constant/chainIdMapping";
import { convertChainId } from "../utils/display";
import { minDesktop } from "../constant/bp";

const ModalWalletDetail = ({ open, setOpen }) => {
  const { address, connector } = useAccount();
  const { chain: walletChain } = useNetwork();
  const chainId = useMemo(() => convertChainId(walletChain?.id), [walletChain]);
  const { disconnect } = useDisconnect();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const addrValue = useMemo(
    () => `${get(chainIdMapping, `${chainId}.short`)}:${address}`,
    [address, chainId]
  );

  const onClickDisconnect = useCallback(() => {
    disconnect();
    if (connector?.id === "walletConnect") {
      localStorage.setItem("wc@2:client:0.3//session", "[]");
    }
  }, [connector?.id, disconnect]);

  return (
    <StyleLayer
      open={open}
      onClose={() => setOpen(false)}
      slotProps={{
        backdrop: { sx: { backgroundColor: "rgba(0,0,0,.2)" } },
      }}
    >
      <Box className="mod-content">
        <Box sx={{ display: "flex", alignItems: "center", mb: "25px" }}>
          <TextField
            variant="outlined"
            fullWidth
            sx={{ input: { p: "8px 5px" } }}
            value={addrValue}
            InputProps={{
              readOnly: true,
            }}
          />
          <Box sx={{ ml: "5px", flexShrink: 0 }}>
            <CopyToClipboard
              text={addrValue}
              onCopy={() => enqueueSnackbar(t("COPIED"))}
            >
              <IconButton>
                <FiCopy size={14} />
              </IconButton>
            </CopyToClipboard>
          </Box>
        </Box>
        <Box className="wd-row-item">
          <span className="short-t">Wallet</span>
          <span>{get(walletMapping, `${connector?.id}.title`)}</span>
        </Box>
        <Box className="wd-row-item">
          <span className="short-t">Connected network</span>
          <span>{get(chainIdMapping, `${chainId}.title`)}</span>
        </Box>
        <Button
          onClick={onClickDisconnect}
          variant="contained"
          sx={{ margin: "20px auto 0 auto", display: "block" }}
        >
          {t("DISCON_T")}
        </Button>
      </Box>
    </StyleLayer>
  );
};

export default ModalWalletDetail;

const StyleLayer = styled(Modal)`
  .mod-content {
    width: 300px;
    min-height: auto;

    @media ${minDesktop} {
      top: 80px;
      left: auto;
      right: 130px;
      transform: none;
      padding-top: 30px;
      padding-bottom: 30px;
    }
  }
  .wd-row-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    .short-t {
      font-size: 14px;
    }
  }
`;
