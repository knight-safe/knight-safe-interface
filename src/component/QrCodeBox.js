import { Box } from "@mui/material";
import React from "react";
import QRCode from "react-qr-code";

const QrCodeBox = ({ value }) => (
  <Box sx={{ textAlign: "center" }}>
    <Box
      sx={{
        display: "inline-flex",
        justifyContent: "center",
        p: "6px",
        my: "10px",
        background: "#fff",
      }}
    >
      <QRCode value={value} size={200} />
    </Box>
  </Box>
);

export default QrCodeBox;
