import { useRecoilState } from "recoil";
import { useCallback } from "react";
import { get } from "lodash";
import profileState from "../atom/profileState";
import { buildApprovedNamespaces } from "@walletconnect/utils";
import { useEffect, useState } from "react";
import { createWeb3Wallet, web3wallet } from "../utils/createWalletConnect";
import useAbi from "./useAbi";
import { wcNamespaces } from "../constant/walletConnectNamespaces";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

const bypass_list = ["0x3593564c"];

const useInitWalletConnect = () => {
  const [profile] = useRecoilState(profileState);
  const [initedWc, setInitedWc] = useState(false);
  const { onExecTransaction, onSignDataV4 } = useAbi();
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  const reply = useCallback(async (topic, id, body) => {
    const rmsg = {
      topic,
      response: { id, jsonrpc: "2.0", ...body },
    };
    console.log("rmsg:", rmsg);
    return web3wallet.respondSessionRequest(rmsg);
  }, []);
  const replySuccess = useCallback(
    async (topic, id, result) => reply(topic, id, { result }),
    [reply]
  );
  const replyFailure = useCallback(
    async (topic, id, code, message) =>
      reply(topic, id, { error: { code, message } }),
    [reply]
  );

  const onProposalChange = useCallback(
    async (proposal) => {
      if (!initedWc || !profile?.address) {
        return;
      }
      try {
        const { id, params } = proposal;
        const approvedNamespaces = buildApprovedNamespaces({
          proposal: params,
          supportedNamespaces: wcNamespaces(profile?.address),
        });
        const session = await web3wallet.approveSession({
          id: id,
          namespaces: approvedNamespaces,
        });
        console.log("session:", session);
        enqueueSnackbar(t("WC_SUC"), {
          variant: "success",
        });
      } catch (e) {
        console.error(e);
        enqueueSnackbar(t("WC_FAIL"), {
          variant: "",
        });
      }
    },
    [initedWc, profile?.address, enqueueSnackbar, t]
  );

  const onEventChange = useCallback(async (event) => {
    console.log("AppMain.js:60 ~ web3wallet.on ~ session_event:", event);
  }, []);

  const onRequestChange = useCallback(
    async (event) => {
      if (!initedWc || !profile?.address || !event?.id) {
        return;
      }
      let tranParam;
      try {
        const method = get(event, "params.request.method");
        let responseMsg = "";
        if (method === "eth_signTypedData_v4") {
          const signBody = JSON.parse(get(event, "params.request.params.1"));
          console.log("signBody:", signBody);
          const signedMessage = await onSignDataV4(signBody);

          responseMsg = signedMessage;
        } else if (method === "eth_sendTransaction") {
          tranParam = get(event, "params.request.params.0");
          console.log("tranParam:", tranParam);

          const rc = await onExecTransaction(
            tranParam.to,
            tranParam.value || 0,
            tranParam.data
          );
          responseMsg = rc.transactionHash;
        }
        console.log("responseMsg:", responseMsg);
        // reply 4001
        if (
          responseMsg &&
          tranParam &&
          bypass_list.find((s) => tranParam.data.startsWith(s))
        ) {
          await replyFailure(
            event.topic,
            event.id,
            4001,
            "Please refresh your browser"
          );
        } else {
          await replySuccess(event.topic, event.id, responseMsg);
        }
      } catch (e) {
        console.error(e);
        await replySuccess(event.topic, event.id, "");
        enqueueSnackbar(t("WC_FAIL"), {
          variant: "",
        });
      }
    },
    [
      enqueueSnackbar,
      initedWc,
      onExecTransaction,
      onSignDataV4,
      profile?.address,
      replyFailure,
      replySuccess,
      t,
    ]
  );
  const onPingChange = useCallback(async (event) => {
    console.log("AppMain.js:60 ~ web3wallet.on ~ session_Ping:", event);
  }, []);
  const onDeleteChange = useCallback(
    async (event) => {
      console.log("AppMain.js:60 ~ web3wallet.on ~ session_Delete:", event);
      enqueueSnackbar(t("WC_DISCONNECT"), {
        variant: "",
      });
    },
    [enqueueSnackbar, t]
  );

  useEffect(() => {
    const initWC = async () => {
      const web3wallet = await createWeb3Wallet();

      // disconnect all wallect
      // await disconnectAllWC();

      setInitedWc(true);
      return web3wallet;
    };
    initWC();
  }, []);

  useEffect(() => {
    if (initedWc) {
      console.log("on ~ session_proposal:");
      web3wallet.on("session_proposal", onProposalChange);
    }

    return () => {
      if (initedWc) {
        console.log("off ~ session_proposal:");
        web3wallet.off("session_proposal", onProposalChange);
      }
    };
  }, [initedWc, onProposalChange]);

  useEffect(() => {
    if (initedWc) web3wallet.on("session_event", onEventChange);
    return () => {
      if (initedWc) web3wallet.off("session_event", onEventChange);
    };
  }, [initedWc, onEventChange]);

  useEffect(() => {
    if (initedWc) web3wallet.on("session_request", onRequestChange);
    return () => {
      if (initedWc) web3wallet.off("session_request", onRequestChange);
    };
  }, [initedWc, onRequestChange]);

  useEffect(() => {
    if (initedWc) web3wallet.on("session_ping", onPingChange);
    return () => {
      if (initedWc) web3wallet.off("session_ping", onPingChange);
    };
  }, [initedWc, onPingChange]);

  useEffect(() => {
    if (initedWc) web3wallet.on("session_delete", onDeleteChange);
    return () => {
      if (initedWc) web3wallet.off("session_delete", onDeleteChange);
    };
  }, [initedWc, onDeleteChange]);
};

export default useInitWalletConnect;
