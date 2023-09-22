import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import React, { useCallback, useState, useEffect } from "react";
import { styled } from "styled-components";
import { MdRefresh } from "react-icons/md";
import { get } from "lodash";
import { web3wallet } from "../utils/createWalletConnect";
import { minAddr } from "../utils/display";
import { RiDeleteBinLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const WalletConnectingList = () => {
  const [wcList, setWcList] = useState([]);
  const { t } = useTranslation();

  const onFetch = useCallback(async () => {
    const pairings = await web3wallet.getActiveSessions();
    setWcList(Object.values(pairings));
  }, []);

  const onDelete = useCallback(
    async (e) => {
      await web3wallet.disconnectSession(e);
      await onFetch();
    },
    [onFetch]
  );

  useEffect(() => {
    onFetch();
  }, [onFetch]);
  return (
    <StyleLayer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Typography component="h3">{t("CONNET_LISTT")}</Typography>
        <Button
          size="small"
          onClick={onFetch}
          sx={{
            color: "#fff",
          }}
        >
          <MdRefresh color="#fff" size={18} style={{ marginRight: "6px" }} />
          {/* {t("REF_T")} */}
        </Button>
      </Box>
      {wcList.length ? (
        <Grid container spacing={2} sx={{ mb: "20px" }}>
          {wcList.map((w, index) => (
            <React.Fragment key={w.topic}>
              <Grid item xs={1}>
                {index + 1}
              </Grid>
              <Grid item xs={9}>
                <Typography component="p" className="peerName" sx={{ m: 0 }}>
                  {get(w, "peer.metadata.name")}
                </Typography>
                <Typography component="p">
                  {minAddr(get(w, "topic"), 8, 8)}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => onDelete(w)}>
                  <RiDeleteBinLine />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      ) : (
        <Typography component="p">-</Typography>
      )}
    </StyleLayer>
  );
};

export default WalletConnectingList;

const StyleLayer = styled(Box)`
  h3 {
    font-size: 18px;
    font-weight: bold;
  }
  p.peerName {
    margin: 0;
  }
`;
