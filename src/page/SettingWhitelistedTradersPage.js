import React, { useCallback, useEffect } from "react";
import { styled } from "styled-components";
import ContentBox from "../component/ContentBox";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { BiRevision } from "react-icons/bi";
import { has, keyBy, mapValues, omit, pickBy } from "lodash";
import { useRecoilState } from "recoil";
import profileState from "../atom/profileState";
import useAbi from "../hooks/useAbi";
import { isAddress } from "web3-validator";
import { red, yellow } from "@mui/material/colors";
import useRefreshProfile from "../hooks/useRefreshProfile";
import loadingModalState from "../atom/loadingModalState";
import { useSnackbar } from "notistack";
import { getErrMsg } from "../utils/display";
import { useTranslation } from "react-i18next";
import isLoadingModState from "../atom/isLoadingModState";

const convertAddr = (d) =>
  mapValues(
    keyBy(d, (e) => e),
    () => 1
  );

const SettingWhitelistedTradersPage = () => {
  const { onUpdateWhiteTrader } = useAbi();
  const [profile] = useRecoilState(profileState);
  const refreshProfile = useRefreshProfile();
  const [, setLoadingOpen] = useRecoilState(isLoadingModState);
  const [newAddr, setNewAddr] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  // 1=add, 2=remove, 3=new_add, 0=no_exist
  const [addrApplyedList, setAddrApplyedList] = useState(() =>
    profile?.traders ? convertAddr(profile.traders) : {}
  );

  useEffect(() => {
    setAddrApplyedList(() =>
      profile?.traders ? convertAddr(profile.traders) : {}
    );
  }, [profile?.traders]);

  const handleAddrApplyedListChange = (key, num) => {
    if (key === "all") {
      setAddrApplyedList(mapValues({ ...addrApplyedList }, () => num));
    } else {
      if (num === 0) {
        setAddrApplyedList((obj) => omit(obj, [key]));
      } else {
        setAddrApplyedList({ ...addrApplyedList, [key]: num });
      }
    }
  };

  const onUpdate = useCallback(async () => {
    const toAdd = Object.keys(pickBy(addrApplyedList, (e) => [3].includes(e)));
    const toRm = Object.keys(pickBy(addrApplyedList, (e) => [2].includes(e)));
    if (!toAdd.length && !toRm.length) {
      return;
    }
    console.log("toRm,toAdd:", toRm, toAdd);
    try {
      setLoadingOpen(true);
      await onUpdateWhiteTrader(toRm, toAdd);
      await refreshProfile();
      enqueueSnackbar(t("UPDATE_WHITE_TRA_SUC"), {
        variant: "success",
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar(getErrMsg(t("UPDATE_WHITE_T"), e), {
        variant: "",
      });
    } finally {
      setLoadingOpen(false);
    }
  }, [
    addrApplyedList,
    enqueueSnackbar,
    onUpdateWhiteTrader,
    refreshProfile,
    setLoadingOpen,
    t,
  ]);

  const onAddAddress = () => {
    if (!isAddress(newAddr)) {
      return;
    }
    if (has(addrApplyedList, newAddr)) {
      return;
    }
    setAddrApplyedList((v) => ({
      ...v,
      [newAddr]: 3,
    }));
    setNewAddr("");
  };
  return (
    <StyleLayer>
      <Grid container columnSpacing={2} rowSpacing={0}>
        <Grid item xs={12} lg={6} sx={{ pt: 0 }}>
          <ContentBox title="Trader" tooltip={t("ADD_TRADE_TIP")}>
            {Object.values(addrApplyedList).filter((a) => [1, 3].includes(a))
              .length < 1 ? (
              <p>{t("NO_TRAD_ADDR")}</p>
            ) : (
              Object.keys(addrApplyedList).map(
                (ad) =>
                  [1, 3].includes(addrApplyedList[ad]) && (
                    <Box className="item-row" key={ad}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          maxWidth: "calc(100% - 50px)",
                        }}
                      >
                        <Typography
                          variant="p"
                          component={"p"}
                          sx={{ wordWrap: "break-word", maxWidth: "100%" }}
                          color={addrApplyedList[ad] === 3 && yellow[300]}
                        >
                          {ad}
                        </Typography>
                      </Box>
                      <IconButton
                        onClick={() =>
                          handleAddrApplyedListChange(
                            ad,
                            addrApplyedList[ad] === 3 ? 0 : 2
                          )
                        }
                      >
                        <RiDeleteBinLine />
                      </IconButton>
                    </Box>
                  )
              )
            )}
          </ContentBox>
        </Grid>
        <Grid item xs={12} lg={6}>
          <ContentBox title="Add New Trader" contentSx={{ mb: "15px" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ flex: 1 }}>
                <TextField
                  id="filled-basic"
                  label="Enter address"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={newAddr}
                  onChange={(e) => setNewAddr(e.target.value)}
                />
                {!!newAddr && !isAddress(newAddr) && (
                  <Typography variant="p" component={"p"} color={red[400]}>
                    {t("FILL_VALID_ADD")}
                  </Typography>
                )}
                {!!newAddr && has(addrApplyedList, newAddr) && (
                  <Typography variant="p" component={"p"} color={red[400]}>
                    {t("ADDRESS_EXIST")}
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                sx={{ ml: "15px" }}
                onClick={onAddAddress}
              >
                {t("ADD_T")}
              </Button>
            </Box>
          </ContentBox>
          <ContentBox
            title={`Removing Address (${
              Object.values(addrApplyedList).filter((a) => a === 2).length
            })`}
            onClickSetting={() => handleAddrApplyedListChange("all", 1)}
            ico={BiRevision}
          >
            {Object.values(addrApplyedList).filter((a) => a === 2).length <
            1 ? (
              <p>{t("NO_REM_ADDR")}</p>
            ) : (
              Object.keys(addrApplyedList).map(
                (ad) =>
                  addrApplyedList[ad] === 2 && (
                    <Box className="item-row" key={ad}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          maxWidth: "calc(100% - 50px)",
                          ">p": {
                            pl: "10px",
                            wordWrap: "break-word",
                            maxWidth: "100%",
                          },
                        }}
                      >
                        <IconButton
                          onClick={() => handleAddrApplyedListChange(ad, 1)}
                        >
                          <BiRevision />
                        </IconButton>
                        <p>{ad}</p>
                      </Box>
                      <div />
                    </Box>
                  )
              )
            )}
          </ContentBox>
        </Grid>
      </Grid>
      <Button variant="contained" sx={{ mt: "40px" }} onClick={onUpdate}>
        {t("UPDA_T")}
      </Button>
    </StyleLayer>
  );
};

export default SettingWhitelistedTradersPage;

const StyleLayer = styled.div`
  .item-row {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);

    &:nth-of-type(-n + 1) {
      /* font-weight: bold; */
      padding-top: 0;
    }
  }
  .MuiFormControlLabel-root {
    margin: 0;
    .MuiCheckbox-root {
      padding: 0;
    }
  }
`;
