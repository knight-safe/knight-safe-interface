import {
  Box,
  Button,
  Divider,
  IconButton,
  Input,
  Modal,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { AiOutlineCloseCircle, AiOutlineArrowDown } from "react-icons/ai";
import { get } from "lodash";
import profileState from "../atom/profileState";
import chainState from "../atom/chainState";
import chainIdMapping from "../constant/chainIdMapping";
import useAbi from "../hooks/useAbi";
import { isAddress } from "web3-validator";
import loadingModalState from "../atom/loadingModalState";
import useRefreshProfile from "../hooks/useRefreshProfile";
import { useSnackbar } from "notistack";
import { red } from "@mui/material/colors";
import { getErrMsg } from "../utils/display";
import { useTranslation } from "react-i18next";
import isLoadingModState from "../atom/isLoadingModState";

const ModalTransferOwner = ({ open, setOpen }) => {
  const [profile] = useRecoilState(profileState);
  const [chain] = useRecoilState(chainState);
  const refreshProfile = useRefreshProfile();
  const [recipient, setRecipient] = useState("");
  const [, setLoadingOpen] = useRecoilState(isLoadingModState);
  const { enqueueSnackbar } = useSnackbar();
  const { onChangeOwner } = useAbi();
  const { t } = useTranslation();

  const onUpdate = useCallback(async () => {
    if (!isAddress(recipient)) {
      return;
    }
    try {
      setLoadingOpen(true);
      await onChangeOwner(recipient);
      await refreshProfile();
      setOpen(false);
      enqueueSnackbar("Transfer owner success", {
        variant: "success",
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar(getErrMsg("Transfer owner", e), {
        variant: "",
      });
    } finally {
      setLoadingOpen(false);
    }
  }, [
    setOpen,
    enqueueSnackbar,
    onChangeOwner,
    recipient,
    refreshProfile,
    setLoadingOpen,
  ]);

  return (
    <StyleLayer open={open}>
      <Box className="mod-content">
        <h2>{t("TRAN_OWN")}</h2>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.5)", mb: "20px" }} />
        <Typography component="p">{t("TRAN_FROM")}</Typography>
        <Typography component="p">
          {get(chainIdMapping, `${chain}.short`)}:{profile?.owner}
        </Typography>
        <IconButton className="close-btn" onClick={() => setOpen(false)}>
          <AiOutlineCloseCircle />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", mt: "16px" }}>
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.5)", flex: 1 }} />
          <AiOutlineArrowDown size={36} color="#8061FF" />
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.5)", flex: 1 }} />
        </Box>
        <Typography component="p" sx={{ fontWeight: 400, fontSize: "14px" }}>
          {t("REC_ADDR")}
        </Typography>
        <Input
          className="search-input"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        />
        {!!recipient && !isAddress(recipient) && (
          <Typography variant="p" component={"p"} color={red[400]}>
            {t("FILL_VALID_ADD")}
          </Typography>
        )}
        <Button
          variant="contained"
          sx={{ mt: "20px", display: "flex", ml: "auto" }}
          onClick={onUpdate}
        >
          {t("TRANS_T")}
        </Button>
      </Box>
    </StyleLayer>
  );
};

export default ModalTransferOwner;

const StyleLayer = styled(Modal)`
  .mod-content {
    width: 600px;
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
