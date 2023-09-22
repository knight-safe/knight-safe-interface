import React, { useCallback } from "react";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { styled } from "styled-components";
import { useRecoilState } from "recoil";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { get, isFunction, isString } from "lodash";
import confirmModalState from "../atom/confirmModalState";
import { useMemo } from "react";

const ModalConfirm = () => {
  const [open, setOpen] = useRecoilState(confirmModalState);

  const dm = useMemo(() => {
    if (!open) {
      return {};
    }
    return {
      title: open?.title || "Confirmation",
      message: !open?.message ? null : isString(open.message) ? (
        <Typography component="p">{open.message}</Typography>
      ) : (
        open.message
      ),
      yesText: open?.yesText || "Yes",
      yes: () => {
        if (isFunction(open?.yes)) {
          open.yes();
        }
        setOpen(false);
      },
      noText: open?.noText || "No",
      no: () => {
        if (isFunction(open?.no)) {
          open.no();
        }
        setOpen(false);
      },
      size: open?.size || "sm",
    };
  }, [open, setOpen]);

  return (
    <StyleLayer open={!!open} onClose={() => setOpen(false)} size={dm.size}>
      <Box className="mod-content">
        <h2>{dm.title}</h2>
        <Box sx={{ minHeight: dm.size === "md" ? "300px" : "200px" }}>
          {dm.message}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button onClick={dm.yes}>{dm.yesText}</Button>
          <Button onClick={dm.no}>{dm.noText}</Button>
        </Box>
        <IconButton className="close-btn" onClick={() => setOpen(false)}>
          <AiOutlineCloseCircle />
        </IconButton>
      </Box>
    </StyleLayer>
  );
};

export default ModalConfirm;

const StyleLayer = styled(Modal)`
  .mod-content {
    width: ${({ size }) => (size === "md" ? "550px" : "380px")};
  }
  .wal-list {
    margin-top: 15px;
    button {
      width: 100%;
      text-align: left;
      text-transform: none;
      padding-top: 8px;
      padding-bottom: 8px;
      border-color: #fff;
      color: #fff;

      img {
        width: 30px;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
`;
