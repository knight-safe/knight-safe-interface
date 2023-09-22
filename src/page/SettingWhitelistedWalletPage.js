import React, { useCallback, useEffect, useMemo } from "react";
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
import { has, isArray, keyBy, mapValues, omit, pickBy } from "lodash";
import { useRecoilState } from "recoil";
import profileState from "../atom/profileState";
import useAbi from "../hooks/useAbi";
import { isAddress } from "web3-validator";
import { red, yellow } from "@mui/material/colors";
import useRefreshProfile from "../hooks/useRefreshProfile";
import { useSnackbar } from "notistack";
import { getErrMsg } from "../utils/display";
import confirmModalState from "../atom/confirmModalState";
import { useTranslation } from "react-i18next";
import isLoadingModState from "../atom/isLoadingModState";
import { KS_WALLET_SUFFIX } from "../constant/address";

const convertAddr = (d) =>
  mapValues(
    keyBy(d, (e) => e.split("--")[0]),
    () => 1
  );

const SettingWhitelistedWalletPage = () => {
  const { onUpdateWhiteWallet } = useAbi();
  const refreshProfile = useRefreshProfile();
  const [, setLoadingOpen] = useRecoilState(isLoadingModState);
  const [newAddr, setNewAddr] = useState("");
  const { t } = useTranslation();
  const [profile] = useRecoilState(profileState);
  const { enqueueSnackbar } = useSnackbar();
  const [, setOpenConfirm] = useRecoilState(confirmModalState);
  const [addrApplyedList, setAddrApplyedList] = useState(() =>
    profile?.wallet ? convertAddr(profile.wallet) : {}
  );

  const ksWalletAddr = useMemo(
    () =>
      isArray(profile?.wallet)
        ? profile.wallet
            .find((e) => e.indexOf(KS_WALLET_SUFFIX) > -1)
            ?.split("--")[0]
        : null,
    [profile?.wallet]
  );

  useEffect(() => {
    setAddrApplyedList(() =>
      profile?.wallet ? convertAddr(profile.wallet) : {}
    );
  }, [profile?.wallet]);
  // num 1 / 2
  const handleAddrApplyedListChange = useCallback(
    (key, num) => {
      const handleCore = () => {
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

      // handle delet owner address
      if (num === 2 && key === ksWalletAddr) {
        setOpenConfirm({
          title: t("WARN_T"),
          message: t("SURE_DEL"),
          yes: handleCore,
        });
        return;
      }

      handleCore();
    },
    [addrApplyedList, ksWalletAddr, setOpenConfirm, t]
  );

  const onUpdate = useCallback(async () => {
    const toAdd = Object.keys(pickBy(addrApplyedList, (e) => [3].includes(e)));
    const toRm = Object.keys(pickBy(addrApplyedList, (e) => [2].includes(e)));
    if (!toAdd.length && !toRm.length) {
      return;
    }
    console.log("toRm,toAdd:", toRm, toAdd);
    try {
      setLoadingOpen(true);
      await onUpdateWhiteWallet(toRm, toAdd);
      await refreshProfile();
      enqueueSnackbar(t("UPDATE_WHITE_WAL_SUC"), {
        variant: "success",
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar(getErrMsg(t("UPDATE_WHITE_WAL_T"), e), {
        variant: "",
      });
    } finally {
      setLoadingOpen(false);
    }
  }, [
    addrApplyedList,
    enqueueSnackbar,
    onUpdateWhiteWallet,
    refreshProfile,
    setLoadingOpen,
    t,
  ]);

  const onAddAddress = useCallback(() => {
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
  }, [addrApplyedList, newAddr]);

  return (
    <StyleLayer>
      <Grid container columnSpacing={2} rowSpacing={0}>
        <Grid item xs={12} lg={6} sx={{ pt: 0 }}>
          <ContentBox title={t("WALADDR_T")} tooltip={t("ADD_WHITE_ADDR_TIP")}>
            {Object.values(addrApplyedList).filter((a) => [1, 3].includes(a))
              .length < 1 ? (
              <p>{t("NO_WALL_ADDR")}</p>
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
          <ContentBox title={t("ADD_NEW_TIT")} contentSx={{ mb: "15px" }}>
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

export default SettingWhitelistedWalletPage;

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
