import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { BiLinkExternal } from "react-icons/bi";
import { useSnackbar } from "notistack";
import loadingModalState from "../atom/loadingModalState";
import { web3wallet } from "../utils/createWalletConnect";
import WalletConnectingList from "./WalletConnectingList";
import isLoadingModState from "../atom/isLoadingModState";

const ModalUseWalletConnect = ({ open, setOpen }) => {
  const [uri, setUri] = useState("");
  const [, setLoadingOpen] = useRecoilState(isLoadingModState);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const onUpdate = useCallback(async () => {
    try {
      setLoadingOpen(true);
      const cs = await web3wallet.core.pairing.pair({ uri });
      console.log("ModalUseWalletConnect.js:42 ~ onUpdate ~ cs:", cs);
      setOpen(false);
    } catch (e) {
      console.error(e);
      enqueueSnackbar("Task failed: Please check with WalletConnect", {
        variant: "",
      });
    } finally {
      setLoadingOpen(false);
    }
  }, [enqueueSnackbar, setLoadingOpen, setOpen, uri]);

  useEffect(() => {
    setUri("");
  }, [open]);

  return (
    <StyleLayer open={!!open} onClose={() => setOpen(false)}>
      <Box className="mod-content">
        <h2>
          {t("WC_TT")} {open?.title ? `- ${open.title}` : ""}
        </h2>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.5)", mb: "20px" }} />
        {open?.title && (
          <Button
            sx={{ color: "#fff", fontSize: "18px", p: 0 }}
            href={open.link}
            target="_blank"
          >
            <BiLinkExternal style={{ marginRight: "5px" }} />
            {`Open ${open.title}`}
          </Button>
        )}
        <Typography component="p" sx={{ mb: "5px" }}>
          {t("CONN_TRAN_DA")}
        </Typography>
        <Input
          className="search-input"
          value={uri}
          onChange={(e) => setUri(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: "20px", display: "flex", ml: "auto" }}
          onClick={onUpdate}
        >
          {t("CONNEC_T")}
        </Button>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.5)", my: "20px" }} />
        <WalletConnectingList />
        <IconButton className="close-btn" onClick={() => setOpen(false)}>
          <AiOutlineCloseCircle />
        </IconButton>
      </Box>
    </StyleLayer>
  );
};

export default ModalUseWalletConnect;

const StyleLayer = styled(Modal)`
  .mod-content {
    width: 600px;
  }
  h2 {
    padding-right: 25px;
  }
  p {
    margin-top: 10px;
  }
  .search-input {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 8px 20px;
    border-radius: 10px;
    margin-top: 5px;
    width: 100%;
    &::before {
      content: none;
      display: none;
    }
  }
`;
