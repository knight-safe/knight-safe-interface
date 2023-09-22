import { Box, Typography } from "@mui/material";
import React from "react";
import { styled } from "styled-components";

const ConfirmItem = ({ children, title }) => {
  return (
    <StyleLayer>
      <Typography component="h4">{title}</Typography>
      {children}
    </StyleLayer>
  );
};

export default ConfirmItem;

const StyleLayer = styled(Box)`
  margin-bottom: 35px;
  h4 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 5px;
  }
`;
