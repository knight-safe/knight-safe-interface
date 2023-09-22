import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isArray } from "lodash";
import { Typography } from "@mui/material";
import ContentBox from "../component/ContentBox";
import ColoredScrollbar from "../component/ColoredScrollbar";
import profileState from "../atom/profileState";
import chainState from "../atom/chainState";
import WhitelistedTokenBoxList from "./WhitelistedTokenBoxList";
import useAppNavigate from "../hooks/useAppNavigate";

const WhitelistedTokenBox = () => {
  const navigate = useAppNavigate();
  const [profile] = useRecoilState(profileState);
  const [chain] = useRecoilState(chainState);
  const { t } = useTranslation();

  return (
    <ContentBox
      title="Whitelisted Token"
      onClickSetting={() => navigate("/main/settings/token-list")}
    >
      {isArray(profile?.token) && (
        <ColoredScrollbar height={580}>
          <WhitelistedTokenBoxList list={profile.token} />
        </ColoredScrollbar>
      )}
    </ContentBox>
  );
};

export default WhitelistedTokenBox;
