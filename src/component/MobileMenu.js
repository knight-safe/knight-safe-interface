import { Box, Button, Drawer, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useMediaMatch } from "rooks";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";
import { get, isArray } from "lodash";
import { useLocation } from "react-router-dom";
import { useAccount } from "wagmi";
import mobileMenuState from "../atom/mobileMenuState";
import LeftMetaData from "./LeftMetaData";
import PageMenu from "./PageMenu";
import profileState from "../atom/profileState";
import { minDesktop } from "../constant/bp";
import useLogout from "../hooks/useLogout";
import WalletDisplayHead from "./WalletDisplayHead";
import connectModalState from "../atom/connectModalState";
import SelectChain from "./SelectChain";

const MobileMenu = () => {
  const [open, setOpen] = useRecoilState(mobileMenuState);
  const [profile] = useRecoilState(profileState);
  const { connector: activeConnector, address, isConnected } = useAccount();
  const isDesk = useMediaMatch(minDesktop);
  const [, setOpenConnect] = useRecoilState(connectModalState);
  const onLogout = useLogout();
  const { t } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (location?.pathname) {
      setOpen(false);
    }
  }, [location?.pathname, setOpen]);

  if (isDesk || !get(profile, "address")) {
    return;
  }
  return (
    <StyleLayer anchor="left" open={open} onClose={() => setOpen(false)}>
      <Box sx={{ width: "80vw", padding: "30px", minWidth: "300px" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mb: "10px",
            alignItems: "flex-start",
            "> *": {
              mb: "10px",
            },
          }}
        >
          <SelectChain isHeader />
          {address ? (
            <WalletDisplayHead canOpen />
          ) : (
            <Button
              variant="contained"
              sx={{ mr: "20px", mb: "10px" }}
              onClick={() => setOpenConnect(true)}
            >
              {t("CONNECT_WAL")}
            </Button>
          )}
          <Button
            variant="contained"
            sx={{ mr: "20px", mb: "10px" }}
            onClick={onLogout}
          >
            {t("USE_OTHERR_P")}
          </Button>
        </Box>
        <LeftMetaData />
        <hr />
        <PageMenu />
      </Box>
    </StyleLayer>
  );
};

export default MobileMenu;

const StyleLayer = styled(Drawer)``;
