import { Box, Button, Chip, Grid, Switch, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { styled } from "styled-components";
import { LuWallet } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { enqueueSnackbar } from "notistack";
import IosSwitch from "../component/IosSwitch";
import profileState from "../atom/profileState";
import useRefreshProfile from "../hooks/useRefreshProfile";
import useAbi from "../hooks/useAbi";
import ModalTransferOwner from "../component/ModalTransferOwner";
import { getErrMsg } from "../utils/display";
import isLoadingModState from "../atom/isLoadingModState";
import NetworkFeeChip from "../component/NetworkFeeChip";
import { maxDesktop } from "../constant/bp";
import CommonTooltip from "../component/CommonTooltip";

const SettingBasicSettingPage = () => {
  const [profile] = useRecoilState(profileState);
  const refreshProfile = useRefreshProfile();
  const [, setLoadingOpen] = useRecoilState(isLoadingModState);
  const { onChangeRefund, onAcceptPendingOwner } = useAbi();
  const { t } = useTranslation();
  const [openTransOwner, setOpenTransOwner] = useState(false);

  const onClickRefund = useCallback(async () => {
    if (!profile) {
      return;
    }
    try {
      setLoadingOpen(true);
      await onChangeRefund(!profile.isGasRefund);
      await refreshProfile();
      enqueueSnackbar(t("UP_FEE_SUC"), {
        variant: "success",
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar(getErrMsg(t("UP_FEE_T"), e), {
        variant: "",
      });
    } finally {
      setLoadingOpen(false);
    }
  }, [onChangeRefund, profile, refreshProfile, setLoadingOpen, t]);

  const onAcceptPending = useCallback(async () => {
    try {
      setLoadingOpen(true);
      await onAcceptPendingOwner();
      await refreshProfile();
      enqueueSnackbar(t("PENDING_OWNER_SUC"), {
        variant: "success",
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar(getErrMsg(t("PENDING_OWNER_T"), e), {
        variant: "",
      });
    } finally {
      setLoadingOpen(false);
    }
  }, [onAcceptPendingOwner, refreshProfile, setLoadingOpen, t]);

  return (
    <StyleLayer>
      <h3>{t("OWNERSHIP_T")}</h3>
      <Grid
        container
        columnSpacing={2}
        sx={{ mt: "30px", mb: "60px", alignItems: "center" }}
      >
        <Grid item className="item-box-title">
          {t("CURR_OWNER")}
        </Grid>
        <Grid item flex={1} xs={12} lg={8} className="item-box">
          <Typography component="p">
            <LuWallet size={18} />
            {profile?.owner}
          </Typography>
          <Button variant="contained" onClick={() => setOpenTransOwner(true)}>
            {t("TRANS_T")}
          </Button>
        </Grid>
      </Grid>
      {profile?.pendingOwner &&
        profile.pendingOwner !==
          "0x0000000000000000000000000000000000000000" && (
          <Grid
            container
            columnSpacing={2}
            sx={{ mb: "60px", alignItems: "center" }}
          >
            <Grid item className="item-box-title">
              {t("PEND_T")}
            </Grid>
            <Grid item flex={1} xs={12} lg={8} className="item-box">
              <Typography component="p">
                <LuWallet size={18} />
                {profile?.pendingOwner}
              </Typography>
              <Button variant="contained" onClick={onAcceptPending}>
                {t("ACC_T")}
              </Button>
            </Grid>
          </Grid>
        )}
      <Grid
        container
        columnSpacing={2}
        sx={{ mb: "60px", alignItems: "center" }}
      >
        <Grid
          item
          className="item-box-title"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <h3>{t("FEE_REF_T")}</h3>
          <CommonTooltip title={t("ADD_FEE_REF_TIP")} />
        </Grid>
        <Grid item flex={1} xs={12} lg={8} className="item-box">
          <IosSwitch checked={profile.isGasRefund} onClick={onClickRefund} />
          <NetworkFeeChip sx={{ ml: "18px" }} />
        </Grid>
      </Grid>
      <ModalTransferOwner open={openTransOwner} setOpen={setOpenTransOwner} />
    </StyleLayer>
  );
};

export default SettingBasicSettingPage;

const StyleLayer = styled.div`
  h3 {
    font-size: 24px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .item-box-title {
    flex-basis: 300px;
    @media ${maxDesktop} {
      flex-basis: 100%;
    }
  }

  .item-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    /* @media ${maxDesktop} {
      padding-top: 10px;
    } */
    svg {
      margin-right: 15px;
      vertical-align: -2px;
    }
    > button {
      @media ${maxDesktop} {
        margin-top: 10px;
      }
    }

    > p {
      word-break: break-word;
      margin-right: 15px;
      @media ${maxDesktop} {
        margin-top: 10px;
      }
    }
    /* @media ${maxDesktop} {
      flex-direction: column;
    } */
  }
`;
