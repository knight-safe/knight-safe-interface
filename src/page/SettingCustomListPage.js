import React from "react";
import { useTranslation } from "react-i18next";
import { styled } from "styled-components";

const SettingCustomListPage = () => {
  const { t } = useTranslation();
  return (
    <StyleLayer>
      <p>{t("COMING_SOON")}</p>
    </StyleLayer>
  );
};

export default SettingCustomListPage;

const StyleLayer = styled.div`
  p {
    font-size: 18px;
    font-weight: 600;
  }
`;
