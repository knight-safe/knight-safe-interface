import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSnackbar } from "notistack";
import myLinkModalState from "../atom/myLinkModalState";
import QrCodeBox from "./QrCodeBox";

const ModalMyLink = ({ canCopy = true }) => {
  const [open, setOpen] = useRecoilState(myLinkModalState);
  const { t } = useTranslation();
  const [qrValue, setQrValue] = useState(() => window?.location?.href || "");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setQrValue(window?.location?.href);
  }, [open]);

  return (
    <StyleLayer open={open} onClose={() => setOpen(false)}>
      <Box className="mod-content">
        <h2>{t("SHARE_TIT")}</h2>
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
              sx={{ maxWidth: "100%", wordWrap: "break-word" }}
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

export default ModalMyLink;

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
