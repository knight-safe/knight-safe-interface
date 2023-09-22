import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import ContentBox from "../component/ContentBox";
import InputAdornment from "@mui/material/InputAdornment";
import { FiSearch } from "react-icons/fi";
import { Box, Button, Grid, Input, debounce } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import ListAppsItem from "../component/ListAppsItem";
import { useMemo } from "react";
import { lowerCase, includes, isEmpty, get, pickBy, chain } from "lodash";
import { getAppWithFunc } from "../utils/display";
import profileState from "../atom/profileState";
import { useRecoilState } from "recoil";
import chainState from "../atom/chainState";
import walletConnect_png from "../assets/images/walletConnect.png";
import ModalUseWalletConnect from "../component/ModalUseWalletConnect";
import { useTranslation } from "react-i18next";

const AppsPage = () => {
  const [appType, setAppType] = useState("");
  const [appName, setAppName] = useState("");
  const inputRef = useRef(null);
  const [openWc, setOpenWc] = useState(false);
  const [chainId] = useRecoilState(chainState);
  const { t } = useTranslation();

  const [profile] = useRecoilState(profileState);
  const appWithFunc = useMemo(
    () => getAppWithFunc(profile?.app, chainId),
    [chainId, profile?.app]
  );

  const allFunc = useMemo(
    () =>
      chain(appWithFunc)
        .mapValues((p) => Object.keys(p.func))
        .values()
        .flatten()
        .uniq()
        .value(),
    [appWithFunc]
  );
  const handleTypeChange = (event) => {
    setAppType(event.target.value);
  };

  const handleNameChange = debounce((event) => {
    setAppName(event.target.value);
  }, 500);

  const onClearSearch = () => {
    setAppType("");
    setAppName("");
    inputRef.current.value = "";
  };

  const listApp = useMemo(() => {
    let filterdApp = { ...appWithFunc };

    if (appName && appName.length >= 3) {
      filterdApp = pickBy(filterdApp, (e) =>
        includes(lowerCase(e.title), lowerCase(appName))
      ); //
      console.log(filterdApp);
    }
    if (appType) {
      filterdApp = pickBy(filterdApp, (p) => !!get(p, `func.${appType}`));
      console.log(filterdApp);
    }
    return filterdApp;
  }, [appName, appType, appWithFunc]);

  return (
    <StyleLayer>
      <ContentBox title="Apps" contentSx={{ p: 0, background: "none" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={8}>
            <Input
              className="search-input"
              inputRef={inputRef}
              onChange={handleNameChange}
              startAdornment={
                <InputAdornment position="start">
                  <FiSearch size={22} />
                </InputAdornment>
              }
              placeholder={t("SEARCH_PLACE")}
            />
          </Grid>

          <Grid item xs={12} lg={4}>
            <Box sx={{ display: "flex" }}>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={appType}
                onChange={handleTypeChange}
                variant="filled"
                className="search-select"
                placeholder={t("SEARCH_TYPE")}
              >
                <MenuItem value="">
                  <em>{t("SEARCH_NONE")}</em>
                </MenuItem>
                {allFunc.map((f) => (
                  <MenuItem value={f} key={f}>
                    {f}
                  </MenuItem>
                ))}
              </Select>
              <Button
                variant="contained"
                onClick={onClearSearch}
                sx={{ ml: "10px" }}
              >
                {t("SEARCH_RESET")}
              </Button>
            </Box>
          </Grid>
        </Grid>
        <Button
          variant="outline"
          size="large"
          sx={{
            mt: "30px",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            py: "8px",
            // border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
          onClick={() => setOpenWc(true)}
        >
          <Box
            sx={{
              display: "inline-block",
              width: "30px",
              mr: "10px",
              img: { display: "block" },
            }}
          >
            <img src={walletConnect_png} alt="wallet connect" width="100%" />
          </Box>
          <span>{t("USE_WALL")}</span>
        </Button>
        <Grid container spacing={2} sx={{ mt: "20px" }}>
          {!isEmpty(listApp) ? (
            Object.keys(listApp).map((p) => (
              <Grid item xs={12} sm={6} lg={3} key={p}>
                <ListAppsItem
                  img={get(listApp, `${p}.img`)}
                  title={get(listApp, `${p}.title`)}
                  desc={get(listApp, `${p}.desc`)}
                  func={get(listApp, `${p}.func`)}
                  link={get(listApp, `${p}.link`)}
                  onOpen={() => setOpenWc(listApp[p])}
                />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <p>{t("NO_RES")}</p>
            </Grid>
          )}
        </Grid>
      </ContentBox>
      <ModalUseWalletConnect open={openWc} setOpen={setOpenWc} />
    </StyleLayer>
  );
};

export default AppsPage;

const StyleLayer = styled.div`
  padding-top: 16px;
  .search-input {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 8px 20px;
    border-radius: 10px;
    width: 100%;
    &::before {
      content: none;
      display: none;
    }
  }
  .search-select {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    width: 100%;
    > .MuiSelect-select {
      padding-top: 12px;
      padding-bottom: 13px;
      padding-left: 20px;
    }
    &::before {
      content: none;
      display: none;
    }
  }
`;
