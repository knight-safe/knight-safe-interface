import React, { useState } from "react";
import { styled } from "styled-components";
import { Box, Button, Typography } from "@mui/material";
import moment from "moment";
import { useIntervalWhen } from "rooks";
import { MdRefresh } from "react-icons/md";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import profileState from "../atom/profileState";
import useRefreshProfile from "../hooks/useRefreshProfile";

const RefreshProfileButton = ({ sx }) => {
  const refresh = useRefreshProfile();
  const [profile] = useRecoilState(profileState);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [fromNow, setFromNow] = useState(() =>
    moment(profile.lastUpdateTime).fromNow()
  );
  useIntervalWhen(
    () => {
      setFromNow(moment(profile.lastUpdateTime).fromNow());
    },
    10000,
    true
  );

  return (
    <StyleLayer
      sx={{
        marginBottom: "-30px",
        marginTop: "-10px",
        ...sx,
      }}
    >
      <Button
        size="small"
        onClick={async () => {
          await refresh(true);
          enqueueSnackbar(t("PROF_REF"), {
            variant: "success",
          });
        }}
        sx={{
          color: "#fff",
          ml: "auto",
          display: "flex",
        }}
      >
        <MdRefresh color="#fff" size={18} style={{ marginRight: "6px" }} />
        {t("REF_T")}
      </Button>
      {profile?.lastUpdateTime && (
        <Typography component="p" className="last-time">
          {fromNow}
        </Typography>
      )}
    </StyleLayer>
  );
};

export default RefreshProfileButton;

const StyleLayer = styled(Box)`
  text-align: right;
  .last-time {
    font-size: 12px;
    line-height: 1;
    margin-top: -5px;
    padding: 0 5px;
    color: #bdbdbd;
  }
`;
