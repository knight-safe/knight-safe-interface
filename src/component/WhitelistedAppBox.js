import { Grid } from "@mui/material";
import React, { useMemo } from "react";
import ContentBox from "./ContentBox";
import { useRecoilState } from "recoil";
import profileState from "../atom/profileState";
import { getAppWithFunc } from "../utils/display";
import chainState from "../atom/chainState";
import { useTranslation } from "react-i18next";
import WhitelistedAppBoxList from "./WhitelistedAppBoxList";
import useAppNavigate from "../hooks/useAppNavigate";

const WhitelistedAppBox = () => {
  const navigate = useAppNavigate();
  const [profile] = useRecoilState(profileState);
  const [chainId] = useRecoilState(chainState);
  const { t } = useTranslation();
  const appWithFunc = useMemo(
    () => getAppWithFunc(profile?.app, chainId),
    [chainId, profile?.app]
  );
  return (
    <ContentBox
      title="Whitelisted Apps"
      onClickSetting={() => navigate("/main/settings/apps-list")}
      contentSx={{ background: "none", p: 0 }}
    >
      <Grid container spacing={2}>
        <WhitelistedAppBoxList appWithFunc={appWithFunc} />
      </Grid>
    </ContentBox>
  );
};

export default WhitelistedAppBox;
