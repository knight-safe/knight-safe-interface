/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import { useMediaMatch } from "rooks";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { FiMenu } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { get } from "lodash";
import { useAccount } from "wagmi";
import connectModalState from "../atom/connectModalState";
import logo from "../assets/images/logo.png";
import WalletDisplayHead from "./WalletDisplayHead";
import SelectChain from "./SelectChain";
import profileState from "../atom/profileState";
import useLogout from "../hooks/useLogout";
import { minDesktop } from "../constant/bp";
import mobileMenuState from "../atom/mobileMenuState";

const MainHeader = ({ sx }) => {
  const [, setOpenConnect] = useRecoilState(connectModalState);
  const [profile] = useRecoilState(profileState);
  const isDesk = useMediaMatch(minDesktop);
  const onLogout = useLogout();
  const [, setOpenMobMenu] = useRecoilState(mobileMenuState);
  const { t } = useTranslation();
  const { connector: activeConnector, address, isConnected } = useAccount();

  return (
    <StyleLayer sx={sx}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <a href="https://www.knightsafe.io/" target="_blank">
          <span className="logo">
            <img src={logo} alt="knightsafe" />
          </span>
        </a>
        <Typography
          component="p"
          sx={{
            ml: "10px",
            color: "#efeaff",
            paddingTop: "7px",
            fontWeight: "500",
          }}
        >
          beta
        </Typography>
      </Box>
      <Box
        sx={{
          pr: isDesk ? "20px" : "0",
          display: "flex",
          alignItems: "center",
        }}
      >
        {isDesk ? (
          <>
            <Button variant="contained" sx={{ mr: "20px" }} onClick={onLogout}>
              {get(profile, "address") ? t("USE_OTHERR_P") : t("ADD_WAL")}
            </Button>

            {address ? (
              <WalletDisplayHead canOpen />
            ) : (
              <Button
                variant="contained"
                sx={{ mr: "20px" }}
                onClick={() => setOpenConnect(true)}
              >
                {t("CONNECT_WAL")}
              </Button>
            )}
            <SelectChain isHeader />
          </>
        ) : (
          get(profile, "address") && (
            <IconButton onClick={() => setOpenMobMenu(true)}>
              <FiMenu />
            </IconButton>
          )
        )}
      </Box>
    </StyleLayer>
  );
};

export default MainHeader;
const StyleLayer = styled(Box)`
  font-family: "Noto Sans", "Roboto", "Helvetica", "Arial", sans-serif;
  background-color: #32344a;
  padding: 10px 30px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    width: 230px;
    max-width: 50vw;
    display: block;
    img {
      width: 100%;
    }
  }
`;
