import React from "react";
import TokenBox from "./TokenBox";
import { useRecoilState } from "recoil";
import TOKEN_LIST from "../constant/TOKEN_LIST";
import chainState from "../atom/chainState";
import { useTranslation } from "react-i18next";

const WhitelistedTokenBoxList = ({ list = [] }) => {
  const [chain] = useRecoilState(chainState);
  const { t } = useTranslation();

  if (!list.length) {
    return <p>{t("NO_DATA")}</p>;
  }

  return (
    <>
      {list.map((tp) => (
        <TokenBox
          img={TOKEN_LIST[tp].img}
          key={tp}
          name={TOKEN_LIST[tp].title}
          shortName={TOKEN_LIST[tp].symbol}
          address={TOKEN_LIST[tp].address[chain]}
        />
      ))}
    </>
  );
};

export default WhitelistedTokenBoxList;
