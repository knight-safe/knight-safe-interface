import React, { useCallback, useEffect } from "react";
import { styled } from "styled-components";
import ContentBox from "../component/ContentBox";
import { Box, Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import TokenListName from "../component/TokenListName";
import { useRecoilState } from "recoil";
import profileState from "../atom/profileState";
import { get, omit, pick, pickBy } from "lodash";
import chainState from "../atom/chainState";
import TOKEN_LIST from "../constant/TOKEN_LIST";
import chainIdMapping from "../constant/chainIdMapping";
import useAbi from "../hooks/useAbi";
import loadingModalState from "../atom/loadingModalState";
import useRefreshProfile from "../hooks/useRefreshProfile";
import { useSnackbar } from "notistack";
import { yellow } from "@mui/material/colors";
import { convertAddr, getErrMsg } from "../utils/display";
import { useTranslation } from "react-i18next";
import isLoadingModState from "../atom/isLoadingModState";

const SettingTokenListPage = () => {
  const [chain] = useRecoilState(chainState);
  const [profile] = useRecoilState(profileState);
  const { onUpdateToken } = useAbi();
  const [, setLoadingOpen] = useRecoilState(isLoadingModState);
  const refreshProfile = useRefreshProfile();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const [accessList, setAccessList] = useState(() =>
    profile?.token ? convertAddr(profile.token, chain) : {}
  );

  useEffect(() => {
    setAccessList(() =>
      profile?.token ? convertAddr(profile.token, chain) : {}
    );
  }, [chain, profile]);

  const handleChange = (event) => {
    setAccessList({
      ...accessList,
      [event.target.name]: event.target.checked,
    });
  };

  const onUpdate = useCallback(async () => {
    const toAdd = Object.keys(
      pickBy(omit(accessList, profile.token), (e) => !!e)
    );
    const toRm = Object.keys(
      pickBy(pick(accessList, profile.token), (e) => !e)
    );
    if (!profile || (!toAdd.length && !toRm.length)) {
      return;
    }
    try {
      setLoadingOpen(true);
      await onUpdateToken(toRm, toAdd);
      await refreshProfile();
      enqueueSnackbar(t("UPDATE_TOKEN_SUC"), {
        variant: "success",
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar(getErrMsg(t("UPDATE_TOKEN_T"), e), {
        variant: "",
      });
    } finally {
      setLoadingOpen(false);
    }
  }, [
    accessList,
    enqueueSnackbar,
    onUpdateToken,
    profile,
    refreshProfile,
    setLoadingOpen,
    t,
  ]);

  return (
    <StyleLayer>
      <ContentBox title="Token List" contentSx={{ maxWidth: "550px" }}>
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
                  onChange={handleChange}
                  name={k}
                  sx={{
                    "&": {
                      color: profile.token.includes(k) ? yellow[300] : "#fff",
                    },
                    "&.Mui-checked": {
                      color: profile.token.includes(k) ? "#fff" : yellow[300],
                    },
                  }}
                />
              }
            />
          </Box>
        ))}
      </ContentBox>
      <Button variant="contained" sx={{ mt: "40px" }} onClick={onUpdate}>
        {t("UPDA_T")}
      </Button>
      <Button
        variant="outlined"
        sx={{ mt: "40px", ml: "20px" }}
        onClick={() =>
          setAccessList(() =>
            profile?.token ? convertAddr(profile.token, chain) : {}
          )
        }
      >
        {t("SEARCH_RESET")}
      </Button>
    </StyleLayer>
  );
};

export default SettingTokenListPage;

const StyleLayer = styled.div`
  .item-row {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);

    &:nth-of-type(-n + 1) {
      font-weight: bold;
      padding-top: 0;
    }
  }
  .MuiFormControlLabel-root {
    margin: 0;
    .MuiCheckbox-root {
      padding: 0;
    }
  }
`;
