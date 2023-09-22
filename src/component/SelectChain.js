import { Box, MenuItem, Select } from "@mui/material";
import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { get, isEmpty } from "lodash";
import chainIdMapping from "../constant/chainIdMapping";
import chainState from "../atom/chainState";
import checkIsKnightSafe from "../utils/checkIsKnightSafe";
import profileState from "../atom/profileState";
import loadingModalState from "../atom/loadingModalState";
import getKnightSafeProfile from "../utils/getKnightSafeProfile";
import useLogout from "../hooks/useLogout";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import isLoadingModState from "../atom/isLoadingModState";

const SelectChain = ({ isHeader }) => {
  const [chain, setChain] = useRecoilState(chainState);
  const [profile, setProfile] = useRecoilState(profileState);
  const [, setLoadingOpen] = useRecoilState(isLoadingModState);
  const onLogout = useLogout();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const handleChange = useCallback(
    (event) => {
      setChain(event.target.value);
    },
    [setChain]
  );

  const onSwitchWalletChain = useCallback(
    async (event) => {
      setLoadingOpen(true);
      const pendingChain = event.target.value;
      if (!profile?.address) {
        return;
      }
      try {
        const isKS = await checkIsKnightSafe(profile?.address, pendingChain);
        if (!isKS) {
          onLogout();
          enqueueSnackbar(t("PLES_ANOT_ADDRE"), {
            variant: "info",
          });
          return;
        }
        const res = await getKnightSafeProfile(profile?.address, pendingChain);
        if (!isEmpty(res)) {
          setProfile(() => res);
          enqueueSnackbar(
            `${t("AUTO_DETECT")}${chainIdMapping[pendingChain].title}`,
            {
              variant: "success",
            }
          );
        }
      } catch (e) {
      } finally {
        handleChange(event);
        setLoadingOpen(false);
      }
    },
    [
      enqueueSnackbar,
      handleChange,
      onLogout,
      profile?.address,
      setLoadingOpen,
      setProfile,
      t,
    ]
  );

  return (
    <StyleLayer
      value={chain}
      onChange={isHeader ? onSwitchWalletChain : handleChange}
      size="small"
    >
      <MenuItem value={"0xa4b1"}>
        {get(chainIdMapping, "0xa4b1.title")}
      </MenuItem>
      {/* <MenuItem value={"0x1"}>{get(chainIdMapping, "0x1.title")}</MenuItem> */}
    </StyleLayer>
  );
};

export default SelectChain;

const StyleLayer = styled(Select)``;
