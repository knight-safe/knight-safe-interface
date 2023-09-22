import React from "react";
import { styled } from "styled-components";
import { AiOutlineSetting } from "react-icons/ai";
import { Box, IconButton } from "@mui/material";
import { useMediaMatch } from "rooks";
import { minDesktop } from "../constant/bp";
import CommonTooltip from "./CommonTooltip";

const ContentBox = ({
  title = "",
  onClickSetting,
  // noContent = false,
  children,
  contentSx,
  tooltip,
  ico = AiOutlineSetting,
}) => {
  const Icon = ico;
  const isDesk = useMediaMatch(minDesktop);
  return (
    <StyleLayer>
      <div className="content-head">
        <h3>{title}</h3>
        {onClickSetting && (
          <IconButton onClick={onClickSetting} sx={{ ml: "8px" }}>
            <Icon size={22} />
          </IconButton>
        )}
        {tooltip && <CommonTooltip title={tooltip} />}
      </div>
      {children && (
        <Box
          className="content-main"
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: isDesk ? "15px 30px" : "15px 15px",
            borderRadius: "10px",
            ...contentSx,
          }}
        >
          {children}
        </Box>
      )}
    </StyleLayer>
  );
};

export default ContentBox;

const StyleLayer = styled.div`
  .content-head {
    display: flex;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    h3 {
      font-size: 24px;
    }
    button {
      /* margin: 0;
      padding: 0; */
    }
  }
  .content-main {
  }
`;
