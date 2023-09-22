import React, { useCallback, useMemo, useState } from "react";
import { styled } from "styled-components";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { PiWarningCircleBold } from "react-icons/pi";
import { yellow } from "@mui/material/colors";
import { FiExternalLink } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { get } from "lodash";
import profileState from "../atom/profileState";
import chainIdMapping from "../constant/chainIdMapping";
import chainState from "../atom/chainState";
import tokenRateState from "../atom/tokenRateState";
import TOKEN_LIST from "../constant/TOKEN_LIST";
import ContentBox from "../component/ContentBox";
import {
  checkTokenIsOnlist,
  displayBalance,
  displayPrice,
  getPriceToUsD,
} from "../utils/display";
import ModalSendAsset from "../component/ModalSendAsset";
import eth_logo from "../assets/images/token/ETH.png";
import ColoredScrollbar from "../component/ColoredScrollbar";
import { maxDesktop } from "../constant/bp";

const AssetsPage = () => {
  const [profile] = useRecoilState(profileState);
  const [chain] = useRecoilState(chainState);
  const [tokenRate] = useRecoilState(tokenRateState);
  const [openSendAsset, setOpenSendAsset] = useState(false);
  const { t } = useTranslation();

  const ethToken = useMemo(
    () => ({
      name: "Ethereum",
      balance: profile?.ethBalance,
      contractAddress: get(TOKEN_LIST, `WETH.address.${chain}`),
      symbol: "ETH",
      decimals: 18,
    }),
    [chain, profile?.ethBalance]
  );

  return (
    <StyleLayer>
      <ContentBox title="Assets" contentSx={{ padding: 0 }}>
        <ColoredScrollbar
          width="100%"
          height="auto"
          scrollbarProps={{ autoHeight: true, autoHeightMax: 800 }}
        >
          <Grid container className="assets-table">
            <Grid item xs={5}>
              {t("ASSET_T")}
            </Grid>
            <Grid item xs={3} className="jfe">
              {t("BALA_T")}
            </Grid>
            <Grid item xs={2} className="jfe">
              {t("VAL_USD")}
            </Grid>
            <Grid item xs={2} className="jfe"></Grid>
            {[ethToken, ...profile.tokensForOwner].map((tp) => {
              const isETH = tp.symbol === ethToken.symbol;
              return (
                <React.Fragment key={tp.contractAddress}>
                  <Grid item xs={5}>
                    <Box
                      className="roundd"
                      sx={{
                        backgroundColor: !TOKEN_LIST[tp.symbol]?.img
                          ? "#a5a5a5"
                          : undefined,
                      }}
                    >
                      {(isETH || TOKEN_LIST[tp.symbol]?.img) && (
                        <img
                          src={isETH ? eth_logo : TOKEN_LIST[tp.symbol]?.img}
                          alt={tp.name}
                        />
                      )}
                    </Box>
                    <Box>
                      <Typography component="p">{tp.name}</Typography>
                      <Typography component="p" className="symbol-label">
                        {tp.symbol}
                      </Typography>
                    </Box>
                    {!isETH && (
                      <a
                        href={`${chainIdMapping[chain].scan}token/${tp.contractAddress}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FiExternalLink />
                      </a>
                    )}
                  </Grid>
                  <Grid item xs={3} className="jfe">
                    {displayBalance(tp.balance)}
                  </Grid>
                  <Grid item xs={2} className="jfe">
                    {getPriceToUsD(tp.balance, tokenRate[tp.contractAddress]) <=
                      0 &&
                      tp.contractAddress !==
                        get(TOKEN_LIST, `WETH.address.${chain}`) && (
                        <Tooltip title={t("NO_TRADE_TOOL")}>
                          <IconButton>
                            <PiWarningCircleBold
                              size={18}
                              color={yellow[400]}
                            />
                          </IconButton>
                        </Tooltip>
                      )}
                    {displayPrice(tp.balance, tokenRate[tp.contractAddress])}
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={() => setOpenSendAsset(tp)}
                      disabled={!checkTokenIsOnlist(tp?.contractAddress, chain)}
                    >
                      {t("SEND_T")}
                    </Button>
                  </Grid>
                </React.Fragment>
              );
            })}
          </Grid>
        </ColoredScrollbar>
      </ContentBox>
      <ModalSendAsset open={openSendAsset} setOpen={setOpenSendAsset} />
    </StyleLayer>
  );
};

export default AssetsPage;

const StyleLayer = styled.div`
  padding-top: 16px;
  .MuiGrid-item {
    padding: 20px 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    font-size: 18px;
    display: flex;
    align-items: center;
    position: relative;

    > a {
      font-size: 14px;
      color: #bcaef4;
      margin-left: 13px;
    }
    &:nth-of-type(-n + 4) {
      font-size: 16px;
      border-top: none;
      color: #c1c1c1;
      white-space: nowrap;
    }
  }

  .roundd {
    width: 30px;
    height: 30px;
    display: inline-block;
    border-radius: 50%;
    line-height: 1;
    margin-right: 15px;
    vertical-align: -8px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .assets-table {
    /* @media ${maxDesktop} { */
    min-width: 800px;
    /* } */
  }
  .jfe {
    justify-content: flex-end;
  }
  .symbol-label {
    font-size: 14px;
    color: #bcaef4;
  }
`;
