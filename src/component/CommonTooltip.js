import { Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { styled } from "styled-components";
import { PiWarningCircleBold } from "react-icons/pi";

const CommonTooltip = ({ color = "#fff", title = "" }) => {
  return (
    <Tooltip title={title}>
      <IconButton>
        <PiWarningCircleBold size={18} color={color} />
      </IconButton>
    </Tooltip>
  );
};

export default CommonTooltip;
