import React from "react";
import { Box, Chip, Grid, Typography } from "@mui/material";
import { isEmpty, isFunction } from "lodash";
import IosSwitch from "./IosSwitch";
import { get, mapValues, set } from "lodash";
import { red } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

const WhitelistAppsBox = ({
  id,
  img,
  title,
  desc,
  sx,
  func = {},
  enable,
  setAppControl,
}) => {
  const { t } = useTranslation();
  const handleSwitch = (key, bool) => {
    if (!isFunction(setAppControl)) {
      return;
    }
    setAppControl((appControl) => {
      const ctl = { ...appControl };
      set(ctl, `${key}.enable`, bool);
      if (!bool) {
        set(
          ctl,
          `${key}.func`,
          mapValues(get(ctl, `${key}.func`), () => false)
        );
      }
      return ctl;
    });
  };
  const onClickLabel = (key, bool) => {
    if (enable) {
      setAppControl((appControl) => {
        const ctl = { ...appControl };
        set(ctl, `${id}.func.${key}`, bool);
        return ctl;
      });
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        position: "relative",
        padding: "22px 30px",
        borderRadius: "10px",
        height: "100%",
        ".WhitelistAppsBox-title": {
          fontSize: "22px",
          color: "#fff",
          fontWeight: "bold",
          mb: "5px",
        },
        ">img": {
          width: "68px",
        },
        ".WhitelistAppsBox-desc": {
          fontSize: "14px",
          color: "rgb(207 174 255 / 55%)",
          mb: "15px",
          lineHeight: 1.3,
          minHeight: "37px",
        },
        ".MuiSwitch-root": {
          position: "absolute",
          top: "35px",
          right: "20px",
        },
        ".off-label": {
          position: "absolute",
          zIndex: 1,
          top: "31px",
          right: "89px",
          fontSize: "23px",
          fontWeight: "bold",
          color: "#979797",
        },
        // opacity: enable ? 1 : 0.3,
        ...sx,
      }}
    >
      <img src={img} />
      <p className="WhitelistAppsBox-title">{title}</p>
      <p className="WhitelistAppsBox-desc">{desc}</p>
      {!enable && <Typography className="off-label">OFF</Typography>}
      {!isEmpty(func) && (
        <Grid container spacing={1} sx={{ px: "10px" }}>
          {Object.keys(func).map((e) => (
            <Chip
              key={e}
              label={e}
              color={get(func, e) ? "primary" : "default"} //default
              sx={{ display: "flex", textAlign: "center", mr: "10px" }}
              onClick={
                isFunction(setAppControl)
                  ? () => onClickLabel(e, !get(func, e))
                  : undefined
              }
            />
          ))}
        </Grid>
      )}

      {enable && func && !Object.values(func).includes(true) && (
        <Typography
          variant="p"
          component={"p"}
          color={red[500]}
          sx={{ mt: "10px", fontSize: "14px" }}
        >
          {t("ENABLE_ONE_FN")}
        </Typography>
      )}
      {isFunction(setAppControl) && (
        <IosSwitch
          checked={enable}
          onChange={() => handleSwitch(id, !enable)}
        />
      )}
    </Box>
  );
};

export default WhitelistAppsBox;
