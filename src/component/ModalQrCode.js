import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { get } from "lodash";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import profileState from "../atom/profileState";
import chainState from "../atom/chainState";
import chainIdMapping from "../constant/chainIdMapping";
import qrCodeModalState from "../atom/qrCodeModalState";
import QrCodeBox from "./QrCodeBox";

const ModalQrCode = ({ canCopy }) => {
  const [open, setOpen] = useRecoilState(qrCodeModalState);
  const [profile] = useRecoilState(profileState);
  const [chain] = useRecoilState(chainState);
  const { t } = useTranslation();
  const [qrValue, setQrValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setQrValue(`${get(chainIdMapping, `${chain}.short`)}:${profile?.address}`);
  }, [chain, profile?.address, open]);

  return (
    <StyleLayer open={open} onClose={() => setOpen(false)}>
      <Box className="mod-content">
        <h2>{t("QR_C")}</h2>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {canCopy ? (
            <TextField
              variant="outlined"
              fullWidth
              value={qrValue}
              onChange={(e) => setQrValue(e.target.value)}
            />
          ) : (
            <Typography
              component="p"
              sx={{ "max-width": "100%", "word-break": "break-word" }}
            >
              {qrValue}
            </Typography>
          )}
          {canCopy && (
            <Box sx={{ ml: "10px", flexShrink: 0 }}>
              <CopyToClipboard
                text={qrValue}
                onCopy={() => enqueueSnackbar(t("COPIED"))}
              >
                <Button variant="contained">Copy</Button>
              </CopyToClipboard>
            </Box>
          )}
        </Box>
        <QrCodeBox value={qrValue} size={200} />
        <IconButton className="close-btn" onClick={() => setOpen(false)}>
          <AiOutlineCloseCircle />
        </IconButton>
      </Box>
    </StyleLayer>
  );
};

export default ModalQrCode;

const StyleLayer = styled(Modal)`
  .wal-list {
    margin-top: 15px;
    button {
      width: 100%;
      text-align: left;
      text-transform: none;
      padding-top: 8px;
      padding-bottom: 8px;
      img {
        width: 30px;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
`;
