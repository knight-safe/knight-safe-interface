import { Box, Typography } from "@mui/material";
import React from "react";
import ContentBox from "./ContentBox";
import { LuWallet } from "react-icons/lu";
import ColoredScrollbar from "./ColoredScrollbar";
import MenuAccordion from "./MenuAccordion";
import { useRecoilState } from "recoil";
import profileState from "../atom/profileState";
import { get, isArray } from "lodash";
import chainState from "../atom/chainState";
import chainIdMapping from "../constant/chainIdMapping";
import useAppNavigate from "../hooks/useAppNavigate";
import TraderBoxList from "./TraderBoxList";

const OtherWhitelistBox = () => {
  const navigate = useAppNavigate();
  const [profile] = useRecoilState(profileState);
  const [chain] = useRecoilState(chainState);
  return (
    <ContentBox
      title="Other Whitelists"
      // onClickSetting={() => navigate("/main/settings/custom-list")}
    >
      {isArray(profile?.other) && (
        <ColoredScrollbar height={300}>
          <TraderBoxList list={profile?.other} />
        </ColoredScrollbar>
      )}
    </ContentBox>
  );
};

export default OtherWhitelistBox;
