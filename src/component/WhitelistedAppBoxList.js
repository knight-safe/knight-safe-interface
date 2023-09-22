import React from "react";
import { Grid } from "@mui/material";
import WhitelistAppsBox from "./WhitelistAppsBox";
import { get } from "lodash";
import { appWithFuncHasFunc } from "../utils/display";
import { useTranslation } from "react-i18next";

const WhitelistedAppBoxList = ({ appWithFunc }) => {
  const { t } = useTranslation();

  if (!appWithFuncHasFunc(appWithFunc)) {
    return (
      <Grid item xs={12}>
        <p>{t("NO_DATA")}</p>
      </Grid>
    );
  }
  return (
    <>
      {Object.keys(appWithFunc).map((ap) => {
        // no function enable
        if (!Object.values(get(appWithFunc, `${ap}.func`)).includes(true)) {
          return null;
        }
        return (
          <Grid item xs={12} sm={6} lg={3} key={ap}>
            <WhitelistAppsBox
              title={ap}
              img={get(appWithFunc, `${ap}.img`)}
              desc={get(appWithFunc, `${ap}.desc`)}
              func={get(appWithFunc, `${ap}.func`)}
              enable={get(appWithFunc, `${ap}.enable`)}
            />
          </Grid>
        );
      })}
    </>
  );
};

export default WhitelistedAppBoxList;
