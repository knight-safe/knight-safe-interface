import { Button, Grid, Typography } from "@mui/material";
import { styled } from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import profileState from "../atom/profileState";
import { chain, difference, get } from "lodash";
import useAbi from "../hooks/useAbi";
import loadingModalState from "../atom/loadingModalState";
import useRefreshProfile from "../hooks/useRefreshProfile";
import { getAppWithFunc, getErrMsg } from "../utils/display";
import WhitelistAppsBox from "../component/WhitelistAppsBox";
import chainState from "../atom/chainState";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import isLoadingModState from "../atom/isLoadingModState";

const SettingAppsListPage = () => {
  const [appControl, setAppControl] = useState({});
  const [profile] = useRecoilState(profileState);
  const [, setLoadingOpen] = useRecoilState(isLoadingModState);
  const refreshProfile = useRefreshProfile();
  const { t } = useTranslation();
  const { onUpdateApp } = useAbi();
  const [chainId] = useRecoilState(chainState);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (profile?.app) {
      setAppControl(() => getAppWithFunc(profile.app, chainId));
    }
  }, [chainId, profile.app]);

  const onUpdate = useCallback(async () => {
    const appOld = [...profile.app];
    const appUp = chain(appControl)
      .map((c, key) =>
        chain(c.func)
          .pickBy((r) => !!r)
          .keys()
          .map((e) => key + "_" + e)
          .value()
      )
      .flatten()
      .value();
    const toAdd = difference(appUp, appOld);
    const toRm = difference(appOld, appUp);

    if (!profile || (!toAdd.length && !toRm.length)) {
      return;
    }
    try {
      setLoadingOpen(true);
      await onUpdateApp(toRm, toAdd);
      await refreshProfile();
      enqueueSnackbar(t("UPDATE_APP_SUC"), {
        variant: "success",
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar(getErrMsg(t("UPDATE_APP_T"), e), {
        variant: "",
      });
    } finally {
      setLoadingOpen(false);
    }
  }, [
    appControl,
    enqueueSnackbar,
    onUpdateApp,
    profile,
    refreshProfile,
    setLoadingOpen,
    t,
  ]);

  return (
    <StyleLayer>
      <Grid container spacing={2}>
        {Object.keys(appControl).map((ap) => (
          <Grid item xs={12} sm={6} lg={3} key={ap} className="appCard">
            <WhitelistAppsBox
              key={ap}
              id={ap}
              img={get(appControl, `${ap}.img`)}
              title={get(appControl, `${ap}.title`)}
              desc={get(appControl, `${ap}.desc`)}
              enable={get(appControl, `${ap}.enable`)}
              func={get(appControl, `${ap}.func`)}
              setAppControl={setAppControl}
            />
          </Grid>
        ))}
      </Grid>
      <p className="small-text">{t("DIS_EN_LAB")}</p>
      <Button variant="contained" sx={{ mt: "40px" }} onClick={onUpdate}>
        {t("UPDA_T")}
      </Button>
      <Button
        variant="outlined"
        sx={{ mt: "40px", ml: "20px" }}
        onClick={() =>
          setAppControl(() => getAppWithFunc(profile.app, chainId))
        }
      >
        {t("SEARCH_RESET")}
      </Button>
    </StyleLayer>
  );
};

export default SettingAppsListPage;

const StyleLayer = styled.div`
  .appCard {
    position: relative;
  }
  .small-text {
    font-size: 13px;
    color: #a6a6a6;
    padding: 7px 0 0 9px;
  }
`;
