import { Box, Typography } from "@mui/material";
import React from "react";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import { BiHome, BiCoinStack } from "react-icons/bi";
import { SiGitbook } from "react-icons/si";
import { AiOutlineAppstore, AiOutlineSetting } from "react-icons/ai";
import MenuAccordion from "../component/MenuAccordion";
import pj from "../../package.json";
import NavAppLink from "./NavAppLink";

const PageMenu = () => {
  const { t } = useTranslation();
  return (
    <StyleLayer className="nav-link">
      <NavAppLink to="/main/dashboard">
        <BiHome />
        <span>{t("DASHBOARD_T")}</span>
      </NavAppLink>
      <NavAppLink to="/main/assets">
        <BiCoinStack />
        <span>{t("ASSE_TT")}</span>
      </NavAppLink>
      <NavAppLink to="/main/apps">
        <AiOutlineAppstore />
        <span>{t("APP_T")}</span>
      </NavAppLink>

      <MenuAccordion
        defaultExpanded
        head={
          <NavAppLink to="/main/settings/basic-setting">
            <AiOutlineSetting />
            <span>{t("SETT_TIT")}</span>
          </NavAppLink>
        }
        content={
          <>
            <NavAppLink to="/main/settings/basic-setting">
              {t("BASIC_SET")}
            </NavAppLink>
            <NavAppLink to="/main/settings/whitelisted-traders">
              {t("WHITE_TRAD")}
            </NavAppLink>
            <NavAppLink to="/main/settings/whitelisted-wallet">
              {t("WHITE_WAL")}
            </NavAppLink>
            <NavAppLink to="/main/settings/token-list">
              {t("TOKE_LL")}
            </NavAppLink>
            <NavAppLink to="/main/settings/apps-list">{t("APP_LS")}</NavAppLink>
          </>
        }
      />
      <hr className="mt-10" />
      <a
        className="git-link"
        href="https://knightsafe.gitbook.io/knightsafe-v1/"
        target="_blank"
        rel="noreferrer"
      >
        <SiGitbook />
        <span>{t("GIT_B")}</span>
      </a>
      <hr className="mt-6" />
      <Typography
        component="p"
        sx={{ fontSize: "14px", color: "#a5a5a5", pl: "15px", pb: "10px" }}
      >
        {t("COPYRIGHT")}
      </Typography>
    </StyleLayer>
  );
};

export default PageMenu;

const StyleLayer = styled(Box)`
  &.nav-link {
    a {
      display: block;
      color: #fff;
      border-radius: 10px;
      padding: 8px 19px;
      margin-bottom: 10px;
      text-decoration: none;
      position: relative;

      &.active {
        background-color: rgb(199 186 255 / 20%);
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 7px;
          width: 5px;
          height: 25px;
          background-color: #8061ff;
        }
      }

      &:hover {
        background-color: rgb(199 186 255 / 30%);
      }

      > svg {
        vertical-align: -4px;
        margin-right: 10px;
        font-size: 21px;
      }
    }
  }

  .MuiButtonBase-root {
    text-transform: none;
  }
  .MuiSwitch-root .MuiSwitch-track {
    background-color: #979797;
  }
`;
