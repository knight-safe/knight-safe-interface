import React from "react";
import { styled } from "styled-components";
import ContentBox from "../component/ContentBox";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { maxDesktop } from "../constant/bp";
import { useTranslation } from "react-i18next";
import NavAppLink from "../component/NavAppLink";
import ColoredScrollbar from "../component/ColoredScrollbar";

const SettingsPage = () => {
  const { t } = useTranslation();
  return (
    <StyleLayer>
      <ContentBox title="Settings" contentSx={{ background: "none", p: 0 }}>
        <ColoredScrollbar
          scrollbarProps={{ autoHeight: true, className: "setting-scroll" }}
          height="auto"
        >
          <Box className="setting-nav">
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
            {/* <NavAppLink to="/main/settings/custom-list">
              {t("CUSTO_LS")}
            </NavAppLink> */}
            <Box
              sx={{
                flex: 1,
                borderBottom: "4px solid rgba(255, 255, 255, 0.3)",
              }}
            />
          </Box>
        </ColoredScrollbar>
      </ContentBox>
      <Outlet />
    </StyleLayer>
  );
};

export default SettingsPage;

const StyleLayer = styled.div`
  padding-top: 16px;
  .setting-scroll {
    margin-bottom: 20px;

    @media ${maxDesktop} {
      margin-bottom: 40px;
    }
  }

  .setting-nav {
    margin-top: 20px;
    display: flex;

    > a {
      color: #fff;
      text-decoration: none;
      display: inline-block;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      padding: 10px 30px 15px 30px;
      border-bottom: 4px solid rgba(255, 255, 255, 0.3);
      white-space: nowrap;

      @media ${maxDesktop} {
        font-size: 14px;
        padding: 8px 16px 10px 16px;
      }

      &.active {
        border-color: rgb(164 141 255);
      }
      &:hover {
        border-color: rgb(164 141 255);
      }
    }
  }
`;
