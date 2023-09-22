import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Input,
  Modal,
  Typography,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { AiOutlineCloseCircle, AiOutlineArrowDown } from "react-icons/ai";
import { isAddress } from "web3-validator";
import { useSnackbar } from "notistack";
import { red } from "@mui/material/colors";
import { endsWith, get } from "lodash";
import { useTranslation } from "react-i18next";
import profileState from "../atom/profileState";
import chainState from "../atom/chainState";
import chainIdMapping from "../constant/chainIdMapping";
import useAbi from "../hooks/useAbi";
import useRefreshProfile from "../hooks/useRefreshProfile";
import {
  checkTokenIsOnlist,
  displayBalance,
  displayPrice,
  getErrMsg,
  minAddr,
} from "../utils/display";
import tokenRateState from "../atom/tokenRateState";
import { ASSETS_PAGE_ERROR_MESSAGE } from "../constant/ERROR_MESSAGE";
import isLoadingModState from "../atom/isLoadingModState";
import { maxDesktop } from "../constant/bp";
import { KS_WALLET_SUFFIX } from "../constant/address";

const ModalSendAsset = ({ open, setOpen }) => {
  const [profile] = useRecoilState(profileState);
  const [chain] = useRecoilState(chainState);
  const refreshProfile = useRefreshProfile();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmout] = useState("");
  const [, setLoadingOpen] = useRecoilState(isLoadingModState);
  const [tokenRate] = useRecoilState(tokenRateState);
  const { enqueueSnackbar } = useSnackbar();
  const { onTransfer, onSendEth } = useAbi();
  const { t } = useTranslation();

  const isETH = useMemo(() => open?.symbol === "ETH", [open?.symbol]);

  const onUpdate = useCallback(async () => {
    if (!recipient || !isAddress(recipient)) {
      console.log("wrong recipient");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) > open.balance) {
      console.log("wrong amount");
      return;
    }
    if (!checkTokenIsOnlist(open.contractAddress, chain)) {
      console.log("contract not on list");
      return;
    }
    try {
      setLoadingOpen(true);

      if (isETH) {
        await onSendEth(recipient, amount * Math.pow(10, open.decimals));
      } else {
        await onTransfer(
          open.contractAddress,
          recipient,
          amount * Math.pow(10, open.decimals)
        );
      }

      await refreshProfile();
      enqueueSnackbar(
        `Send ${amount} ${open.symbol} to ${minAddr(recipient)} success`,
        {
          variant: "success",
        }
      );
      setOpen(false);
    } catch (e) {
      console.error(e);
      enqueueSnackbar(
        getErrMsg("Send token", e, { errorMapper: ASSETS_PAGE_ERROR_MESSAGE }),
        { variant: "" }
      );
    } finally {
      setLoadingOpen(false);
    }
  }, [
    amount,
    chain,
    enqueueSnackbar,
    isETH,
    onSendEth,
    onTransfer,
    open,
    recipient,
    refreshProfile,
    setLoadingOpen,
    setOpen,
  ]);

  useEffect(() => {
    setRecipient("");
    setAmout("");
  }, [open]);

  return (
    <StyleLayer open={!!open}>
      <Box className="mod-content">
        <Box sx={{ display: "flex" }}>
          <h2>{t("SEND_TOKEN")}</h2>
          <Chip
            label={chainIdMapping[chain].title}
            color="primary"
            sx={{ ml: "16px" }}
          />
        </Box>
        <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.5)", mb: "20px" }} />
        <Typography component="p">{t("SD_FROM")}</Typography>
        <Typography component="p" sx={{ wordWrap: "break-word" }}>
          {get(chainIdMapping, `${chain}.short`)}:{profile?.address}
        </Typography>
        <IconButton className="close-btn" onClick={() => setOpen(false)}>
          <AiOutlineCloseCircle />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", mt: "16px" }}>
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.5)", flex: 1 }} />
          <AiOutlineArrowDown size={36} color="#8061FF" />
          <Divider sx={{ borderColor: "rgba(255, 255, 255, 0.5)", flex: 1 }} />
        </Box>
        <Typography component="p" sx={{ fontWeight: 400, fontSize: "14px" }}>
          {t("REC_ADDR")}
        </Typography>
        <Select
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          variant="filled"
          className="search-select"
          placeholder="=s"
        >
          {profile.wallet
            .filter((d) => !endsWith(d, KS_WALLET_SUFFIX))
            .map((d) => {
              const adr = d.split("--")[0];
              return (
                <MenuItem value={adr} key={adr}>
                  {adr}
                </MenuItem>
              );
            })}
        </Select>
        {!!recipient && !isAddress(recipient) && (
          <Typography variant="p" component={"p"} color={red[400]}>
            {t("FILL_VALID_ADD")}
          </Typography>
        )}
        <Typography component="p">{t("SELEC_ASSE")}</Typography>
        <Box className="selected-asset">
          <Box>
            <Typography
              component="p"
              sx={{ fontWeight: 600, fontSize: "18px" }}
            >
              {open?.name}
            </Typography>
            {!isETH && (
              <Typography
                component="p"
                sx={{ fontWeight: 400, fontSize: "12px", pt: "5px" }}
              >
                {open?.contractAddress}
              </Typography>
            )}
          </Box>
          <Box className="bal-box">
            <Typography component="p">
              {t("BAL_C")}
              {displayBalance(open.balance)} {open.symbol}
            </Typography>
            <Typography component="p">
              {t("VAL_C")}
              {displayPrice(open.balance, tokenRate[open.contractAddress])} USD
            </Typography>
          </Box>
        </Box>
        <Typography component="p" sx={{ fontWeight: 400, fontSize: "14px" }}>
          {t("AMOUNT_T")}
        </Typography>
        <Box sx={{ position: "relative" }}>
          <Input
            className="search-input"
            value={amount}
            onChange={(e) => setAmout(e.target.value)}
          />
          <Button
            variant="text"
            size="small"
            sx={{
              color: "#fff",
              position: "absolute",
              top: "14px",
              right: "9px",
            }}
            onClick={() => setAmout(open.balance)}
          >
            {t("MAX")}
          </Button>
        </Box>
        {!!amount &&
          (isNaN(amount) || Number(open.balance) < Number(amount)) && (
            <Typography variant="p" component={"p"} color={red[400]}>
              {t("VALID_AMOUNT")}
            </Typography>
          )}
        <Button
          variant="contained"
          sx={{ mt: "20px", display: "flex", ml: "auto" }}
          onClick={onUpdate}
        >
          {t("TRANS_T")}
        </Button>
      </Box>
    </StyleLayer>
  );
};

export default ModalSendAsset;

const StyleLayer = styled(Modal)`
  .mod-content {
    width: 680px;
  }
  p {
    margin-top: 10px;
  }
  .selected-asset {
    display: flex;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 12px 20px;
    border-radius: 10px;
    margin-top: 5px;
    align-items: center;
    justify-content: space-between;

    .bal-box {
      text-align: right;
      @media ${maxDesktop} {
        text-align: left;
      }
    }

    > div {
      max-width: 100%;
      @media ${maxDesktop} {
        margin: 6px 0;
      }
    }

    p {
      margin: 0;
      word-wrap: break-word;
    }

    @media ${maxDesktop} {
      flex-direction: column;
      align-items: flex-start;
      padding: 6px 10px;
    }
  }
  .search-input {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 8px 20px;
    border-radius: 10px;
    margin-top: 5px;
    width: 100%;
    &::before {
      content: none;
      display: none;
    }
  }
  .search-select {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    width: 100%;
    > .MuiSelect-select {
      padding-top: 12px;
      padding-bottom: 13px;
      padding-left: 20px;
    }
    &::before {
      content: none;
      display: none;
    }
  }
`;
