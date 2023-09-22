import { Box, Chip } from "@mui/material";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import profileState from "../atom/profileState";
import { useTranslation } from "react-i18next";
import { isUndefined } from "lodash";
import { useMemo } from "react";

const NetworkFeeChip = ({ sx, isRefund }) => {
  const [profile] = useRecoilState(profileState);
  const { t } = useTranslation();

  const opts = useMemo(() => {
    const rf = !isUndefined(isRefund) ? isRefund : profile?.isGasRefund;
    return [
      {
        label: t("TRADER_TIT"),
        active: !rf,
      },
      {
        label: t("WAL_T"),
        active: rf,
      },
    ];
  }, [isRefund, profile?.isGasRefund, t]);

  return (
    <Box sx={{ display: "inline-flex", ...sx }}>
      {opts.map((c) => (
        <Chip
          key={c.label}
          label={c.label}
          color={c.active ? "primary" : "default"}
          variant={c.active ? "filled" : "outlined"}
          sx={{ mr: "8px", color: c.active ? "#fff" : "#aaaaaa" }}
        />
      ))}
    </Box>
  );
};

export default NetworkFeeChip;

const StyleLayer = styled(Box)``;
