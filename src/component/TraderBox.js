import React from "react";
import { useTranslation } from "react-i18next";
import { isArray } from "lodash";
import ContentBox from "../component/ContentBox";
import ColoredScrollbar from "../component/ColoredScrollbar";
import profileState from "../atom/profileState";
import { useRecoilState } from "recoil";
import TraderBoxList from "./TraderBoxList";
import useAppNavigate from "../hooks/useAppNavigate";

const TraderBox = () => {
  const navigate = useAppNavigate();
  const [profile] = useRecoilState(profileState);
  const { t } = useTranslation();
  return (
    <ContentBox
      title={t("TRADER_TIT")}
      onClickSetting={() => navigate("/main/settings/whitelisted-traders")}
    >
      {isArray(profile?.traders) && (
        <ColoredScrollbar height={300}>
          <TraderBoxList list={profile.traders} />
        </ColoredScrollbar>
      )}
    </ContentBox>
  );
};

export default TraderBox;
