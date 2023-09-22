import React, { useEffect } from "react";
import { styled } from "styled-components";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import MainHeader from "../component/MainHeader";
import chainState from "../atom/chainState";
import { CHAIN_STORE } from "../constant/localStore";
import { maxDesktop } from "../constant/bp";

const OnboardingLayoutPage = () => {
  const setChain = useSetRecoilState(chainState);

  useEffect(() => {
    const localStorageFetch = () => {
      const chainStore = localStorage.getItem(CHAIN_STORE);
      if (chainStore) {
        setChain(chainStore);
      }
    };
    localStorageFetch();
  }, [setChain]);
  return (
    <StyleLayer>
      <MainHeader sx={{ background: "none" }} />
      <div className="onboarding-main">
        <Outlet />
      </div>
    </StyleLayer>
  );
};

export default OnboardingLayoutPage;

const StyleLayer = styled.div`
  font-family: "Noto Sans", "Roboto", "Helvetica", "Arial", sans-serif;
  background: rgb(57, 48, 99);
  background: linear-gradient(
    270deg,
    rgba(57, 48, 99, 1) 0%,
    rgba(32, 33, 36, 1) 55%
  );
  min-height: 100vh;
  position: relative;
  .onboarding-main {
    width: 100%;
    max-width: 1000px;
    margin: 0 auto 0 auto;
    padding-left: 20px;
    padding-right: 20px;

    @media ${maxDesktop} {
      padding-left: 0;
      padding-right: 0;
    }
  }
  .MuiButtonBase-root {
    text-transform: none;
  }
`;
