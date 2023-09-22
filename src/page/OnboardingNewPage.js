import React, { useEffect, useRef, useState, useCallback } from "react";
import { styled } from "styled-components";
import { RiDeleteBinLine } from "react-icons/ri";
import { get, isArray, chain as chainTo } from "lodash";
import { clsx } from "clsx";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import { createSearchParams, useNavigate } from "react-router-dom";
import IosSwitch from "../component/IosSwitch";
import { isAddress } from "web3-validator";
import { useAccount } from "wagmi";
import { useSnackbar } from "notistack";
import { convertAddr, getAppWithFunc, getErrMsg } from "../utils/display";
import SelectChain from "../component/SelectChain";
import chainState from "../atom/chainState";
import TOKEN_LIST from "../constant/TOKEN_LIST";
import chainIdMapping from "../constant/chainIdMapping";
import useAbi from "../hooks/useAbi";
import TokenListName from "../component/TokenListName";
import WhitelistAppsBox from "../component/WhitelistAppsBox";
import WalletDisplayHead from "../component/WalletDisplayHead";
import CommonTooltip from "../component/CommonTooltip";
import { maxDesktop, minDesktop } from "../constant/bp";
import { useMediaMatch } from "rooks";
import { useTranslation } from "react-i18next";
import confirmModalState from "../atom/confirmModalState";
import TraderBoxList from "../component/TraderBoxList";
import WhitelistedTokenBoxList from "../component/WhitelistedTokenBoxList";
import WhitelistedAppBoxList from "../component/WhitelistedAppBoxList";
import ConfirmItem from "../component/ConfirmItem";
import ColoredScrollbar from "../component/ColoredScrollbar";
import isLoadingModState from "../atom/isLoadingModState";
import connectModalState from "../atom/connectModalState";
import NetworkFeeChip from "../component/NetworkFeeChip";

const OnboardingNewPage = () => {
  const nav = useNavigate();
  const [appControl, setAppControl] = useState({});
  const [traderAddress, setTraderAddress] = useState([]);
  const [whiteAddress, setWhiteAddress] = useState([]);
  const traderRef = useRef(null);
  const whiteRef = useRef(null);
  const [isRefund, setIsRefund] = useState(false);
  const [chain] = useRecoilState(chainState);
  const { enqueueSnackbar } = useSnackbar();
  const [accessList, setAccessList] = useState(() => convertAddr([], chain));
  const { onCreateNewWallet } = useAbi();
  const [, setLoadingOpen] = useRecoilState(isLoadingModState);
  const isDesk = useMediaMatch(minDesktop);
  const { t } = useTranslation();
  const [, setOpenConfirm] = useRecoilState(confirmModalState);
  const { address, isConnected } = useAccount();
  const setOpenConnect = useSetRecoilState(connectModalState);

  useEffect(() => {
    setAppControl(() => getAppWithFunc([], chain));
  }, [chain]);

  const handleTokenListChange = (event) => {
    setAccessList({
      ...accessList,
      [event.target.name]: event.target.checked,
    });
  };

  const onPushAddress = (type) => {
    if (type === 1) {
      const pAddr = get(traderRef, "current.value");
      if (!isAddress(pAddr)) {
        enqueueSnackbar(t("FILL_VALID_ADD"), {
          variant: "",
        });
      } else if (traderAddress.includes(pAddr)) {
        enqueueSnackbar(t("ADDRESS_EXIST"), {
          variant: "",
        });
      } else {
        setTraderAddress(() => [...traderAddress, pAddr].sort());
        traderRef.current.value = "";
      }
    } else if (type === 2) {
      const pAddr = get(whiteRef, "current.value");
      if (!isAddress(pAddr)) {
        enqueueSnackbar(t("FILL_VALID_ADD"), {
          variant: "",
        });
      } else if (whiteAddress.includes(pAddr)) {
        enqueueSnackbar(t("ADDRESS_EXIST"), {
          variant: "",
        });
      } else {
        setWhiteAddress(() => [...whiteAddress, pAddr].sort());
        whiteRef.current.value = "";
      }
    }
  };

  const onClearAddress = (type, addr) => {
    if (type === 1) {
      setTraderAddress(() => [...traderAddress].filter((d) => d !== addr));
      traderRef.current.value = "";
    } else if (type === 2) {
      setWhiteAddress(() => [...whiteAddress].filter((d) => d !== addr));
      whiteRef.current.value = "";
    }
  };

  const handleRefundChange = (event) => {
    setIsRefund(event.target.checked);
  };

  const onCreateWalletCore = useCallback(
    async (
      traderAddressPar,
      whiteAddressPar,
      appControlListPar,
      accessListListPar,
      isRefundPar
    ) => {
      try {
        setLoadingOpen(true);
        const bornAddress = await onCreateNewWallet(
          traderAddressPar,
          whiteAddressPar,
          appControlListPar,
          accessListListPar,
          isRefundPar
        );
        console.log("137 ~ onCreateWal ~ bornAddress:", bornAddress);
        nav({
          pathname: "/main/dashboard",
          search: createSearchParams({
            chain: chain,
            address: bornAddress,
          }).toString(),
        });
        // const profileRes = await getKnightSafeProfile(bornAddress, chain);
        // console.log("139 ~ onCreateWal ~ profileRes:", profileRes);
        // setProfile(profileRes);
        // nav("/main/dashboard");
        // enqueueSnackbar(`${t("CREATE_WALL_SUCCESS")}${bornAddress}`, {
        //   variant: "success",
        // });
        // localStorage.setItem(ADDRESS_STORE, profileRes.address);
        // localStorage.setItem(CHAIN_STORE, chain);
      } catch (e) {
        console.error(e);
        enqueueSnackbar(getErrMsg(t("CREA_WAL"), e), {
          variant: "",
        });
      } finally {
        setLoadingOpen(false);
      }
    },
    [chain, enqueueSnackbar, nav, onCreateNewWallet, setLoadingOpen, t]
  );

  const onClickCreateWallet = useCallback(async () => {
    const appControlList = chainTo(appControl)
      .map((e, key) =>
        chainTo(e.func)
          .pickBy((d) => !!d)
          .map((p, kkey) => `${key}_${kkey}`)
          .value()
      )
      .flatten()
      .value();
    const accessListList = chainTo(accessList)
      .pickBy((e) => !!e)
      .keys()
      .value();

    setOpenConfirm({
      size: "md",
      message: (
        <Box>
          <Typography component="p" sx={{ mb: "15px" }}>
            {t("CONFIRM_WALLET")}
          </Typography>
          <ColoredScrollbar height="50vh">
            <ConfirmItem title={t("CHAIN_T")}>
              <Typography component="p">
                {chainIdMapping[chain].title}
              </Typography>
            </ConfirmItem>
            <ConfirmItem title={t("ADD_TRADER")}>
              <TraderBoxList list={traderAddress} />
            </ConfirmItem>
            <ConfirmItem title={t("ADD_WHITE_TITLE")}>
              <TraderBoxList list={whiteAddress} />
            </ConfirmItem>
            <ConfirmItem title={t("WHITE_TOKEN_TIT")}>
              <WhitelistedTokenBoxList list={accessListList} />
            </ConfirmItem>
            <ConfirmItem title={t("WHITE_APP_TIT")}>
              <Box sx={{ pr: "15px" }}>
                <WhitelistedAppBoxList appWithFunc={appControl} />
              </Box>
            </ConfirmItem>
            <ConfirmItem title={t("FEE_REF")}>
              <NetworkFeeChip isRefund={isRefund} />
            </ConfirmItem>
          </ColoredScrollbar>
        </Box>
      ),
      yesText: "Create",
      noText: "Cancel",
      yes: () =>
        onCreateWalletCore(
          traderAddress,
          whiteAddress,
          appControlList,
          accessListList,
          isRefund
        ),
    });
  }, [
    accessList,
    appControl,
    chain,
    isRefund,
    onCreateWalletCore,
    setOpenConfirm,
    traderAddress,
    whiteAddress,
    t,
  ]);

  const onClickSkip = useCallback(async () => {
    document.querySelector("#submit-btn").scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <StyleLayer sx={isDesk ? {} : { p: "20px" }}>
      <h2>{t("CREATE_NEW_TIT")}</h2>
      {address ? (
        <WalletDisplayHead
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.3)",
            display: "inline-flex",
            padding: "10px 15px",
            borderRadius: "15px",
          }}
        />
      ) : (
        <div className="onboard-card">
          <Box as="h3" sx={{ mb: "20px!important" }}>
            {t("CONNECT_WAL")}
          </Box>
          <p>{t("MUST_CONECT")}</p>
          <Button
            variant="contained"
            sx={{ mr: "20px" }}
            onClick={() => setOpenConnect(true)}
          >
            {t("CONNECT_WAL")}
          </Button>
          {/* {!address ? (
            <Button
              variant="contained"
              sx={{ mr: "20px" }}
              onClick={() => setOpenConnect(true)}
            >
              {t("CONNECT_WAL")}
            </Button>
          ) : (
            <Button
              sx={{ color: "#fff", fontSize: "18px", p: 0 }}
              href="https://metamask.io/download/"
              target="_blank"
            >
              <BiLinkExternal style={{ marginRight: "5px" }} />
              {t("DOWNL_MM")}
            </Button>
          )} */}
        </div>
      )}
      <Box className="new-wallet-row" as="h2">
        {t("WAL_SET")}
        <Button
          variant="contained"
          size="large"
          sx={{ ml: "20px" }}
          onClick={onClickSkip}
        >
          {t("SKIP_NOW")}
        </Button>
      </Box>
      <p className="descc">
        {t("FILL_IN_LATE")}
        <button onClick={onClickSkip}>{t("SKIP_NOW")}</button>.
      </p>

      <div className="onboard-card">
        <Box className="title-row">
          <h3>{t("SELECT_CHAIN")}</h3>
        </Box>

        <SelectChain />
      </div>
      <div className="onboard-card">
        <Box className="title-row">
          <h3>{t("ADD_TRADER")}</h3>
          <CommonTooltip title={t("ADD_TRADE_TIP")} />
        </Box>
        <Box className="add-row">
          <Input
            className="search-input"
            inputRef={traderRef}
            placeholder="Enter address"
          />
          <Button variant="contained" onClick={() => onPushAddress(1)}>
            {t("ADD_T")}
          </Button>
        </Box>

        {traderAddress.length ? (
          <Box className="Whitelist-Token" sx={{ mt: "20px" }}>
            <Box className="item-row">
              <p>{t("ADDR_T")}</p>
              <p></p>
            </Box>
            {traderAddress.map((ty) => (
              <Box className="item-row" key={ty}>
                <p>{ty}</p>
                <IconButton onClick={() => onClearAddress(1, ty)}>
                  <RiDeleteBinLine />
                </IconButton>
              </Box>
            ))}
          </Box>
        ) : null}
      </div>
      <div className="onboard-card">
        <Box className="title-row">
          <h3>{t("ADD_WHITE_TITLE")}</h3>
          <CommonTooltip title={t("ADD_WHITE_ADDR_TIP")} />
        </Box>
        <Box className="add-row">
          <Input
            className="search-input"
            inputRef={whiteRef}
            placeholder="Enter address"
          />
          <Button variant="contained" onClick={() => onPushAddress(2)}>
            {t("ADD_T")}
          </Button>
        </Box>
        {whiteAddress.length ? (
          <Box className="Whitelist-Token" sx={{ mt: "20px" }}>
            <Box className="item-row">
              <p>{t("ADDR_T")}</p>
              <p></p>
            </Box>
            {whiteAddress.map((t) => (
              <Box className="item-row" key={t}>
                <p>{t}</p>
                <IconButton onClick={() => onClearAddress(2, t)}>
                  <RiDeleteBinLine />
                </IconButton>
              </Box>
            ))}
          </Box>
        ) : null}
      </div>
      <div className="onboard-card">
        <Box className="title-row">
          <h3>{t("WHITE_TOKEN_TIT")}</h3>
        </Box>
        <Box className="Whitelist-Token">
          <Box className="item-row">
            <p>{t("TOK_T")}</p>
            <p>{t("WHITE_T")}</p>
          </Box>
          {Object.keys(accessList).map((k) => (
            <Box className="item-row" key={k}>
              <TokenListName
                img={TOKEN_LIST[k].img}
                title={TOKEN_LIST[k].title}
                shortName={TOKEN_LIST[k].symbol}
                link={
                  chainIdMapping[chain].scan +
                  "token/" +
                  get(TOKEN_LIST[k], `address.${chain}`)
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={accessList[k]}
                    onChange={handleTokenListChange}
                    name={k}
                  />
                }
              />
            </Box>
          ))}
        </Box>
      </div>
      <div className="onboard-card">
        <Box className="title-row">
          <h3>{t("WHITE_APP_TIT")}</h3>
        </Box>
        <Grid container spacing={2}>
          {Object.keys(appControl).map((ap) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={ap}
              className={clsx("appCard")}
            >
              <WhitelistAppsBox
                key={ap}
                id={ap}
                img={get(appControl, `${ap}.img`)}
                title={get(appControl, `${ap}.title`)}
                desc={get(appControl, `${ap}.desc`)}
                enable={get(appControl, `${ap}.enable`)}
                func={get(appControl, `${ap}.func`)}
                setAppControl={setAppControl}
                sx={{
                  background: "none",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  py: "30px",
                }}
              />
            </Grid>
          ))}
        </Grid>
        <p className="small-text">{t("DIS_EN_LAB")}</p>
      </div>
      <div className="onboard-card">
        <Box className="title-row">
          <h3>{t("FEE_REF")}</h3>
          <CommonTooltip title={t("ADD_FEE_REF_TIP")} />
        </Box>
        <Box className="refund-box">
          <IosSwitch checked={isRefund} onChange={handleRefundChange} />
          <NetworkFeeChip isRefund={isRefund} sx={{ ml: "18px" }} />
        </Box>
      </div>
      <div className="submit-row">
        <Button
          variant="contained"
          size="large"
          onClick={onClickCreateWallet}
          id="submit-btn"
        >
          {t("SUB_T")}
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{ ml: "20px" }}
          onClick={() => nav("/onboarding")}
        >
          {t("BACK_T")}
        </Button>
      </div>
    </StyleLayer>
  );
};

export default OnboardingNewPage;

const StyleLayer = styled(Box)`
  h2 {
    margin-top: 70px;
    margin-bottom: 40px;
    font-size: 28px;

    @media ${maxDesktop} {
      margin-top: 30px;
      margin-bottom: 20px;
    }
  }
  .mt-2 {
    margin-top: 30px;
  }
  .search-input {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 8px 20px;
    border-radius: 10px;
    width: 100%;
    /* margin: 30px 0; */
    margin-right: 30px;
    max-width: 500px;
    display: block;
    &::before {
      content: none;
      display: none;
    }
  }
  .MuiChip-root {
    height: 20px;
    border-radius: 5px;
    margin-top: 5px;
  }
  .onboard-card {
    background: rgb(128 141 226 / 20%);
    padding: 40px;
    border-radius: 10px;
    position: relative;
    margin-bottom: 30px;

    h3 {
      font-size: 22px;
    }

    > p {
      line-height: 1.8;
      font-size: 14px;
      margin-bottom: 20px;
    }

    @media ${maxDesktop} {
      padding: 20px;
    }
  }

  .descc {
    margin-bottom: 20px;
    > button {
      background: none;
      color: #fff;
      border: none;
      font-size: 16px;
      padding: 0;
      text-decoration: underline;
      cursor: pointer;
      &:hover {
        color: #8061ff;
      }
    }
  }
  .small-text {
    font-size: 13px;
    color: #a6a6a6;
    padding: 7px 0 0 9px;
    margin-bottom: 0 !important;
  }
  .Whitelist-Token {
    max-width: 500px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 20px;
  }
  .item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    word-break: break-word;

    &:nth-of-type(-n + 1) {
      font-weight: bold;
      padding-top: 0;
    }
  }
  .MuiSwitch-root .MuiSwitch-track {
    background-color: #979797;
  }
  .submit-row {
    padding-bottom: 60px;
  }
  .title-row {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }
  .new-wallet-row,
  .add-row {
    display: flex;
    align-items: center;

    @media ${maxDesktop} {
      flex-direction: column;
      align-items: flex-start;
      > button {
        margin: 15px 0 0 0;
      }
    }
  }
  .MuiFormControlLabel-root {
    margin: 0;
    .MuiCheckbox-root {
      padding: 0;
    }
  }
`;
