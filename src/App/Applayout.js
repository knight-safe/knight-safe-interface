import React, { useEffect } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { get, isEmpty, isNil } from "lodash";
import { Box, Button, Typography } from "@mui/material";
import { useMediaMatch } from "rooks";
import { useTranslation } from "react-i18next";
import { isAddress } from "web3-validator";
import { enqueueSnackbar } from "notistack";
import { styled } from "styled-components";
import MainHeader from "../component/MainHeader";
import chainState from "../atom/chainState";
import LeftMetaData from "../component/LeftMetaData";
import chainIdMapping from "../constant/chainIdMapping";
import PageMenu from "../component/PageMenu";
import MobileMenu from "../component/MobileMenu";
import { maxDesktop, maxLg, minDesktop } from "../constant/bp";
import RefreshProfileButton from "../component/RefreshProfileButton";
import profileState from "../atom/profileState";
import isLoadingModState from "../atom/isLoadingModState";
import getKnightSafeProfile from "../utils/getKnightSafeProfile";
import { CHAIN_STORE, setAddressStore } from "../constant/localStore";
import checkIsKnightSafe from "../utils/checkIsKnightSafe";
import useLogout from "../hooks/useLogout";
import ModalMyLink from "../component/ModalMyLink";
import useInitWalletConnect from "../hooks/useInitWalletConnect";

const Applayout = () => {
  const [chain] = useRecoilState(chainState);
  const [profile, setProfile] = useRecoilState(profileState);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isDesk = useMediaMatch(minDesktop);
  const [search] = useSearchParams();
  const [loadingOpen, setLoadingOpen] = useRecoilState(isLoadingModState);
  const onLogout = useLogout();
  useInitWalletConnect();

  useEffect(() => {
    const adr = search.get("address");
    const chn = search.get("chain");
    const chainV = chn || chain;
    if (!loadingOpen && adr && adr !== profile?.address) {
      const jumpToOnboard = async () => {
        navigate({ pathname: "/onboarding", search: "" });
        setLoadingOpen(false);
        // enqueueSnackbar(t("FAIL_FETCH"), {
        //   variant: "",
        // });
      };
      const autoFetchByQuery = async () => {
        setLoadingOpen(true);

        // check valid chain and address
        if (!isAddress(adr) || !Object.keys(chainIdMapping).includes(chainV)) {
          jumpToOnboard();
          return;
        }

        const isKnightSafe = await checkIsKnightSafe(adr, chainV);
        if (!isKnightSafe) {
          await jumpToOnboard();
          return;
        }

        const profileRes = await getKnightSafeProfile(adr, chainV);

        if (!isEmpty(profileRes)) {
          setProfile(profileRes);
          enqueueSnackbar(t("EXIST_KS_ADDED"), {
            variant: "success",
          });
          setAddressStore(profileRes.address);
          localStorage.setItem(CHAIN_STORE, chain);
          setLoadingOpen(false);
        } else {
          jumpToOnboard();
        }
      };
      autoFetchByQuery();
    }
  }, [
    chain,
    loadingOpen,
    navigate,
    profile?.address,
    search,
    setLoadingOpen,
    setProfile,
    t,
  ]);

  return (
    <StyleLayer>
      <MainHeader />
      <div className="layout">
        {isDesk && (
          <div className="layout-left">
            <p className="layout-left-head">
              {get(chainIdMapping, `${chain}.title`)}
            </p>
            <div className="layout-left-main">
              <LeftMetaData />
              <hr />
              <PageMenu />
            </div>
          </div>
        )}
        <div className="layout-right">
          {profile?.address ? (
            <>
              <Box>
                <RefreshProfileButton />
              </Box>
              <Outlet />
            </>
          ) : (
            !loadingOpen && (
              <Box>
                <Typography
                  component="h1"
                  sx={{ fontSize: "22px", mt: "30px", mb: "15px" }}
                >
                  {t("NO_KS_AC")}
                </Typography>
                <Button variant="contained" onClick={onLogout}>
                  {t("GO_MAIN")}
                </Button>
              </Box>
            )
          )}
        </div>
      </div>
      <MobileMenu />
      <ModalMyLink />
    </StyleLayer>
  );
};

export default Applayout;

const StyleLayer = styled.div`
  font-family: "Noto Sans", "Roboto", "Helvetica", "Arial", sans-serif;
  color: #fff;
  .layout {
    display: flex;
    min-height: calc(100vh - 80px);
  }

  .layout-left {
    /* flex-basis: 22%; */
    width: 320px;
    /* max-width: 300px; */
    background-color: #32344a;
    padding: 0;
  }
  .layout-right {
    flex: 1;
    background: rgb(57, 48, 99);
    background: linear-gradient(
      262deg,
      rgba(57, 48, 99, 1) 0%,
      rgba(32, 33, 36, 1) 100%
    );
    padding: 20px 30px 80px 30px;
    max-width: calc(100% - 320px);

    @media ${maxDesktop} {
      padding-left: 20px;
      padding-right: 20px;
      max-width: 100%;
    }
  }
  .layout-left-head {
    text-align: center;
    background-color: #8061ff;
    color: #fff;
    padding: 10px;
  }
  .layout-left-main {
    padding: 15px 30px;
    hr {
      margin: 20px 0px;
      border-color: rgba(255, 255, 255, 0.5);

      &.mt-10 {
        margin-top: 130px;
      }
      &.mt-6 {
        margin-top: 50px;
      }
    }
  }

  .MuiChip-root {
    height: 20px;
    border-radius: 5px;
    margin-top: 5px;
  }
  .MuiChip-label {
    padding-left: 18px;
    padding-right: 18px;
  }
  .MuiButton-outline {
  }
  .MuiSwitch-root .MuiSwitch-track {
    background-color: #979797;
  }

  .btns {
    display: flex;
    padding: 10px 0;
    > button,
    > a {
      margin: 0 10px 0 0;
      background-color: rgba(255, 255, 255, 0.2);
      min-width: auto;
      font-size: 20px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: rgba(255, 255, 255, 0.4);
      }
    }
  }
`;
