import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { FiCopy, FiExternalLink } from "react-icons/fi";
import { MdOutlineQrCode } from "react-icons/md";
import { get, isArray, sum } from "lodash";
import { useTranslation } from "react-i18next";
import { useRecoilState, useSetRecoilState } from "recoil";
import { BsFillShareFill } from "react-icons/bs";
import { useSnackbar } from "notistack";
import { styled } from "styled-components";
import profileState from "../atom/profileState";
import chainState from "../atom/chainState";
import chainIdMapping from "../constant/chainIdMapping";
import { displayPrice, getPriceToUsD, minAddr } from "../utils/display";
import qrCodeModalState from "../atom/qrCodeModalState";
import { CopyToClipboard } from "react-copy-to-clipboard";
import useGetTokenRate from "../hooks/useGetTokenRate";
import tokenRateState from "../atom/tokenRateState";
import TOKEN_LIST from "../constant/TOKEN_LIST";
import debank_logo from "../assets/images/debank.png";
import myLinkModalState from "../atom/myLinkModalState";

const LeftMetaData = () => {
  const [profile] = useRecoilState(profileState);
  const [chain] = useRecoilState(chainState);
  const setOpenQr = useSetRecoilState(qrCodeModalState);
  const { enqueueSnackbar } = useSnackbar();
  const { getTokenRate, getETHRate } = useGetTokenRate();
  const [tokenRate] = useRecoilState(tokenRateState);
  const { t } = useTranslation();
  const setOpenMyLink = useSetRecoilState(myLinkModalState);

  const addr = useMemo(() => profile?.address, [profile?.address]);

  useEffect(() => {
    const fetchRate = async () => {
      if (isArray(profile?.tokensForOwner)) {
        const toGetRate = profile.tokensForOwner.map((tp) =>
          getTokenRate(tp.contractAddress)
        );
        await Promise.all([getETHRate(), ...toGetRate]);
      }
    };
    fetchRate();
  }, [profile]);

  const totalValue = useMemo(() => {
    if (!profile?.ethBalance || !isArray(profile?.tokensForOwner)) {
      return 0;
    }
    const ethPrice = getPriceToUsD(
      profile.ethBalance,
      tokenRate[get(TOKEN_LIST, `WETH.address.${chain}`)]
    );
    const otherPrice = profile.tokensForOwner.map((t) =>
      getPriceToUsD(t.balance, tokenRate[t.contractAddress])
    );
    return sum([ethPrice, ...otherPrice]);
  }, [chain, profile, tokenRate]);

  return (
    <StyleLayer>
      <p>{t("SIGNLE_T")}</p>
      <p>
        <b>{get(chainIdMapping, `${chain}.short`)}: </b>
        {profile?.address && <span>{minAddr(profile?.address)}</span>}
      </p>
      <p>
        <b>{displayPrice(totalValue, 1)} USD</b>
      </p>
      <div className="btns">
        <IconButton variant="outline" onClick={() => setOpenQr(true)}>
          <MdOutlineQrCode />
        </IconButton>
        <CopyToClipboard
          text={addr}
          onCopy={() => enqueueSnackbar(t("COPIED"))}
        >
          <IconButton variant="outline">
            <FiCopy />
          </IconButton>
        </CopyToClipboard>
        <IconButton variant="outline" onClick={() => setOpenMyLink(true)}>
          <BsFillShareFill size={18} />
        </IconButton>
        <IconButton
          variant="outline"
          href={
            profile?.address
              ? get(chainIdMapping, `${chain}.scan`) +
                "address/" +
                profile.address
              : ""
          }
          target="_blank"
        >
          <img
            src={get(chainIdMapping, `${chain}.scanLogo`)}
            alt="scan"
            width={20}
          />
        </IconButton>
        <IconButton
          variant="outline"
          href={
            profile?.address
              ? get(chainIdMapping, `${chain}.debank`) + profile.address
              : ""
          }
          target="_blank"
        >
          <img src={debank_logo} alt="debank" width={16} />
        </IconButton>
      </div>
    </StyleLayer>
  );
};

export default LeftMetaData;

const StyleLayer = styled(Box)``;
