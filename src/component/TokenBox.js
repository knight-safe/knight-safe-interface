import { Box, Grid } from "@mui/material";
import React from "react";

const TokenBox = ({ img, name, shortName, address }) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "auto",
        alignItems: "center",
        p: "10px 10px 13px 0",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
      }}
    >
      <Box sx={{ width: "50px", mr: "15px", flexShrink: 0 }}>
        <img src={img} width="100%" />
      </Box>
      <Box sx={{ flex: 1, wordBreak: "break-word" }}>
        <p>
          <b>{name}</b>
          <Box
            as="span"
            sx={{ color: "#ae9aff", fontSize: "15px", ml: "15px" }}
          >
            {shortName}
          </Box>
        </p>
        <p>{address}</p>
      </Box>
    </Box>
  );
};

export default TokenBox;
