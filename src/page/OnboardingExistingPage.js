import React, { useState, useEffect, useCallback } from "react";
import { styled } from "styled-components";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { isAddress } from "web3-validator";
import { red } from "@mui/material/colors";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTranslation } from "react-i18next";
import chainState from "../atom/chainState";
import checkIsKnightSafe from "../utils/checkIsKnightSafe";
import SelectChain from "../component/SelectChain";
import { getAddressOptions } from "../constant/localStore";
import { useMediaMatch } from "rooks";
import { maxDesktop, minDesktop } from "../constant/bp";
import isLoadingModState from "../atom/isLoadingModState";
import useAppNavigate from "../hooks/useAppNavigate";

const OnboardingExistingPage = () => {
  const appNavigate = useAppNavigate();
  const setLoadingOpen = useSetRecoilState(isLoadingModState);
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const isDesk = useMediaMatch(minDesktop);
  const [addr, setAddr] = useState("");
  const nav = useNavigate();
  const [chain, setChain] = useRecoilState(chainState);

  useEffect(() => {
    const localStorageFetch = () => {
      const addrStore = getAddressOptions();
      if (addrStore.length) {
        setAddr(addrStore[0]);
      }
    };
    localStorageFetch();
  }, []);

  const handleChange = (e, value) => setAddr(value);
  const checkWallet = useCallback(async () => {
    if (!addr) {
      return;
    }
    setLoadingOpen(true);

    if (!isAddress(addr)) {
      setLoadingOpen(false);
      return;
    }
    const isKnightSafe = await checkIsKnightSafe(addr, chain);
    if (!isKnightSafe) {
      setLoadingOpen(false);
      enqueueSnackbar(t("ADD_NO_EXIST"), {
        variant: "",
      });
      return;
    }
    nav({
      pathname: "/main/dashboard",
      search: createSearchParams({
        chain: chain,
        address: addr,
      }).toString(),
    });
    console.log("is Knight Safe Address");
    // const profileRes = await getKnightSafeProfile(addr, chain, (e) =>
    //   enqueueSnackbar(getErrMsg("Add wallet", e), { variant: "" })
    // );
    // console.log(
    //   "OnboardingExistingPage.js:43 ~ checkWal ~ profileRes:",
    //   profileRes
    // );
    // if (!isEmpty(profileRes)) {
    //   setProfile(profileRes);
    //   nav("/main/dashboard");
    //   enqueueSnackbar(t("EXIST_KS_ADDED"), {
    //     variant: "success",
    //   });
    //   localStorage.setItem(ADDRESS_STORE, profileRes.address);
    //   localStorage.setItem(CHAIN_STORE, chain);
    //   localStorage.setItem(Auto_FETCH_STORE, 1);
    // } else {
    //   enqueueSnackbar(t("FAIL_FETCH"), {
    //     variant: "",
    //   });
    // }
    setLoadingOpen(false);
  }, [addr, chain, enqueueSnackbar, nav, setLoadingOpen, t]);

  return (
    <StyleLayer sx={isDesk ? {} : { p: "20px" }}>
      <h2>{t("ADD_KS_WALL_TITLE")}</h2>
      <div className="onboard-card">
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Typography component="h3">{t("ENT_ADD")}</Typography>
            <Autocomplete
              freeSolo
              forcePopupIcon
              value={addr}
              onChange={handleChange}
              inputValue={addr}
              onInputChange={handleChange}
              disableClearable
              options={getAddressOptions()}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  InputProps={{
                    ...params.InputProps,
                    // type: "search",
                    className: "search-input",
                  }}
                />
              )}
            />
            {!!addr && !isAddress(addr) && (
              <Typography variant="p" component={"p"} color={red[900]}>
                {t("FILL_VALID_ADD")}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} lg={4}>
            <Typography component="h3">{t("SELECT_CHAIN")}</Typography>
            <SelectChain />
          </Grid>
        </Grid>
        <Box sx={{ mt: "30px" }}>
          <Button variant="contained" size="large" onClick={checkWallet}>
            {t("ADD_WAL")}
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ ml: "20px" }}
            onClick={() => appNavigate("/onboarding")}
          >
            {t("BACK_T")}
          </Button>
        </Box>
      </div>
    </StyleLayer>
  );
};

export default OnboardingExistingPage;

const StyleLayer = styled(Box)`
  h2 {
    margin-top: 70px;
    margin-bottom: 40px;
    font-size: 28px;
  }
  .MuiInput-root.search-input {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 8px 25px 8px 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    display: block;
    &::before {
      content: none;
      display: none;
    }

    .MuiAutocomplete-endAdornment {
      right: 5px;
    }
  }
  .onboard-card {
    background: rgb(128 141 226 / 20%);
    padding: 40px;
    border-radius: 10px;
    position: relative;

    h3 {
      margin-bottom: 20px;
      font-size: 22px;
    }

    @media ${maxDesktop} {
      padding: 20px;
    }
  }
`;
