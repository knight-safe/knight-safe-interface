import React from "react";
import { Box, Button, Chip, Grid } from "@mui/material";
import { get } from "lodash";
import { useTranslation } from "react-i18next";

const ListAppsItem = ({ img, title, desc, func, link, onOpen }) => {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        padding: "30px",
        borderRadius: "10px",
        position: "relative",
        height: "100%",
        img: {
          width: "70px",
        },
        ".ListAppsItem-title": {
          fontSize: "18px",
          color: "#fff",
          fontWeight: "bold",
          mb: "5px",
        },
        ".ListAppsItem-desc": {
          fontSize: "13px",
          color: "#fff",
          mt: "20px",
          mb: "20px",
          minHeight: "75px",
        },
        ".open-btn": {
          display: "inline-block",
          position: "absolute",
          top: "30px",
          right: "30px",
          textDecoration: "none",
          transition: "opacity .3s",
        },
      }}
    >
      <img src={img} />
      <p className="ListAppsItem-title">{title}</p>
      <p className="ListAppsItem-desc">{desc}</p>
      <Grid container spacing={1} sx={{ px: "10px" }}>
        {Object.keys(func).map((e) => (
          <Chip
            key={e}
            label={e}
            color={get(func, e) ? "primary" : "default"} //default
            sx={{ display: "block", textAlign: "center", mr: "10px" }}
          />
        ))}
      </Grid>
      <Button
        variant="contained"
        className="open-btn"
        size="large"
        onClick={onOpen}
      >
        {t("OPEN_T")}
      </Button>
    </Box>
  );
};

export default ListAppsItem;
