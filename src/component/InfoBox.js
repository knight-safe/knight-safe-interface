import React from "react";
import Box from "@mui/material/Box";
import ContentBox from "./ContentBox";
import { Chip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { get } from "lodash";
import profileState from "../atom/profileState";
import chainState from "../atom/chainState";
import chainIdMapping from "../constant/chainIdMapping";
import { useTranslation } from "react-i18next";
import useAppNavigate from "../hooks/useAppNavigate";
import NetworkFeeChip from "./NetworkFeeChip";

const InfoBox = () => {
  const navigate = useAppNavigate();
  const [profile] = useRecoilState(profileState);
  const [chain] = useRecoilState(chainState);
  const { t } = useTranslation();

  return (
    <ContentBox
      title="Info"
      onClickSetting={() => navigate("/main/settings/basic-setting")}
    >
      <Box sx={{ mb: "15px" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <h4>{t("WAL_T")}</h4>
          <Chip
            label={get(chainIdMapping, `${chain}.title`)}
            color="primary"
            sx={{ ml: "16px", mt: "0!important" }}
          />
        </Box>
        <Typography component="p" sx={{ wordWrap: "break-word" }}>
          {get(chainIdMapping, `${chain}.short`)}:{profile?.address}
        </Typography>
      </Box>
      <Box sx={{ mb: "15px" }}>
        <h4>{t("OWNER_T")}</h4>
        <Typography component="p" sx={{ wordWrap: "break-word" }}>
          {get(chainIdMapping, `${chain}.short`)}:{profile?.owner}
        </Typography>
      </Box>
      <h4>{t("FEE_REF")}</h4>
      <NetworkFeeChip sx={{ mt: "5px" }} />
    </ContentBox>
  );
};

export default InfoBox;
