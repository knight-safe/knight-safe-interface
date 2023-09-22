import React from "react";
import { styled } from "styled-components";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TraderBox from "../component/TraderBox";
import InfoBox from "../component/InfoBox";
import WhitelistedTokenBox from "../component/WhitelistedTokenBox";
import WhitelistedAppBox from "../component/WhitelistedAppBox";
import WhitelistedWalletBox from "../component/WhitelistedWalletBox";

const DashboardPage = () => {
  return (
    <StyleLayer>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8}>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <InfoBox />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TraderBox />
              </Grid>
              <Grid item xs={12} lg={6}>
                <WhitelistedWalletBox />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <WhitelistedTokenBox />
        </Grid>
        <Grid item xs={12}>
          <WhitelistedAppBox />
        </Grid>
        {/* <Grid item xs={12} lg={4}>
          <OtherWhitelistBox />
        </Grid> */}
      </Grid>
    </StyleLayer>
  );
};

export default DashboardPage;

const StyleLayer = styled.div`
  .talk-box {
    background-color: #766aa9;
    font-size: 14px;
    padding: 12px 20px;
    font-weight: 300;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: -9px;
      left: 10px;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #766aa9;
    }
  }
`;
