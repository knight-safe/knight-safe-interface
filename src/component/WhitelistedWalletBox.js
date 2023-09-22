import React from "react";
import ContentBox from "./ContentBox";
import ColoredScrollbar from "./ColoredScrollbar";
import { useRecoilState } from "recoil";
import { Box, Typography } from "@mui/material";
import { LuWallet } from "react-icons/lu";
import { get, isArray } from "lodash";
import { useTranslation } from "react-i18next";
import profileState from "../atom/profileState";
import chainState from "../atom/chainState";
import chainIdMapping from "../constant/chainIdMapping";
import white_logo from "../assets/images/white_logo.png";
import useAppNavigate from "../hooks/useAppNavigate";
import { KS_WALLET_SUFFIX } from "../constant/address";

const WhitelistedWalletBox = () => {
  const navigate = useAppNavigate();
  const [profile] = useRecoilState(profileState);
  const { t } = useTranslation();
  const [chain] = useRecoilState(chainState);
  return (
    <ContentBox
      title={t("WHITE_WAL")}
      onClickSetting={() => navigate("/main/settings/whitelisted-wallet")}
    >
      {isArray(profile?.wallet) && (
        <ColoredScrollbar height={300}>
          {profile.wallet.length ? (
            profile.wallet.map((t) => (
              <Box className="wallet-text" key={t}>
                {t.indexOf(KS_WALLET_SUFFIX) > -1 ? (
                  <img src={white_logo} className="white-k" alt="ks wallet" />
                ) : (
                  <LuWallet size={18} />
                )}
                <p>
                  {get(chainIdMapping, `${chain}.short`)}:{t.split("--")[0]}
                </p>
              </Box>
            ))
          ) : (
            <Typography component="p">{t("NO_DATA")}</Typography>
          )}
        </ColoredScrollbar>
      )}
    </ContentBox>
  );
};

export default WhitelistedWalletBox;
