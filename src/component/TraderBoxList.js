import { Box } from "@mui/material";
import React from "react";
import { LuWallet } from "react-icons/lu";
import { styled } from "styled-components";
import chainIdMapping from "../constant/chainIdMapping";
import { useRecoilState } from "recoil";
import chainState from "../atom/chainState";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

const TraderBoxList = ({ list = [] }) => {
  const [chain] = useRecoilState(chainState);
  const { t } = useTranslation();

  if (!list.length) {
    return <p>{t("NO_DATA")}</p>;
  }
  return (
    <>
      {list.map((t) => (
        <Box className="wallet-text" key={t}>
          <LuWallet size={18} />
          <p>
            {get(chainIdMapping, `${chain}.short`)}:{t}
          </p>
        </Box>
      ))}
    </>
  );
};

export default TraderBoxList;
