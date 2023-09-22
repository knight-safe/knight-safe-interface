import React from "react";
import { styled } from "styled-components";
import { Box, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMediaMatch } from "rooks";
import { useTranslation } from "react-i18next";
import { maxDesktop, minDesktop } from "../constant/bp";

const OnboardingPage = () => {
  const isDesk = useMediaMatch(minDesktop);
  const navigate = useNavigate();
  const { t } = useTranslation();

  // useEffect(() => {
  //   const autoLogin = async () => {
  //     if (localStorage.getItem(Auto_FETCH_STORE) !== "1") {
  //       return;
  //     }

  //     if (loadingOpen || !isEmpty(profile)) {
  //       return;
  //     }
  //     console.log("start fetch");
  //     const addr = localStorage.getItem(ADDRESS_STORE);
  //     const chain = localStorage.getItem(CHAIN_STORE);

  //     if (!addr) {
  //       clearLocal();
  //       return;
  //     }
  //     setLoadingOpen(true);
  //     if (!isAddress(addr)) {
  //       clearLocal();
  //       return;
  //     }
  //     const isKnightSafe = await checkIsKnightSafe(addr, chain);
  //     if (!isKnightSafe) {
  //       clearLocal();
  //     } else {
  //       // is Knight Safe Address
  //       console.log(" is Knight Safe Address");
  //       const profileRes = await getKnightSafeProfile(addr, chain);
  //       console.log(
  //         "OnboardingExistingPage.js:43 ~ checkWal ~ profileRes:",
  //         profileRes
  //       );
  //       if (!isEmpty(profileRes)) {
  //         setProfile(profileRes);
  //         setChain(chain);
  //         enqueueSnackbar(t("AUTO_FETCH"), {
  //           variant: "success",
  //         });
  //       } else {
  //         clearLocal();
  //       }
  //     }
  //     setLoadingOpen(false);
  //   };
  //   autoLogin();
  // }, []);

  return (
    <StyleLayer
      container
      columnSpacing={isDesk ? 9 : 0}
      rowSpacing={isDesk ? 0 : 0}
      sx={isDesk ? {} : { p: "20px" }}
    >
      <Grid item xs={12} md={6}>
        <div className="onboard-card">
          <h2>{t("CREATE_NEW_TIT")}</h2>
          <p>{t("CREATE_NEW_DESC")}</p>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/onboarding/new")}
          >
            {t("CREATE_PLUS")}
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <div className="onboard-card">
          <h2>{t("ADD_EXIT_TIT")}</h2>
          <p>{t("ADD_EXIT_DESC")}</p>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/onboarding/existing")}
          >
            {t("ADD_EXIT_BTN")}
          </Button>
        </div>
      </Grid>
    </StyleLayer>
  );
};

export default OnboardingPage;

const StyleLayer = styled(Grid)`
  margin-top: 300px;

  @media ${maxDesktop} {
    margin-top: 0;
  }
  .onboarding-logo {
    position: absolute;
    top: 20px;
    left: 30px;
    width: 230px;
    max-width: 50vw;
    img {
      width: 100%;
    }
  }

  .onboard-card {
    background: rgb(128 141 226 / 20%);
    padding: 100px 40px 42px 40px;
    border-radius: 10px;
    position: relative;

    @media ${maxDesktop} {
      margin-bottom: 30px;
    }

    p {
      line-height: 1.8;
      font-size: 14px;
      margin-top: 15px;
      margin-bottom: 50px;
    }

    &:hover {
      background: linear-gradient(
        255deg,
        rgba(107, 81, 217, 1) 0%,
        rgba(48, 35, 99, 1) 100%
      );
    }
  }
`;
