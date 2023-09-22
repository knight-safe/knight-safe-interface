import React from "react";
import { Box, CircularProgress, Modal } from "@mui/material";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import isLoadingModState from "../atom/isLoadingModState";

const ModalLoading = () => {
  const [open] = useRecoilState(isLoadingModState);
  const { t } = useTranslation();

  return (
    <StyleLayer open={open}>
      <Box className="mod-content">
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
          <p>{t("LOADING_T")}</p>
        </Box>
      </Box>
    </StyleLayer>
  );
};

export default ModalLoading;

const StyleLayer = styled(Modal)`
  .mod-content {
    width: 160px;
    min-height: auto;
    padding: 30px 30px;
  }
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
