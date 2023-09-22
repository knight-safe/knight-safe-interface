import { useCallback } from "react";
import { useRecoilState } from "recoil";
import { isEmpty } from "lodash";
import profileState from "../atom/profileState";
import getKnightSafeProfile from "../utils/getKnightSafeProfile";
import chainState from "../atom/chainState";
import isLoadingModState from "../atom/isLoadingModState";

const useRefreshProfile = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  const [chain] = useRecoilState(chainState);
  const [, setLoadingOpen] = useRecoilState(isLoadingModState);

  const refresh = useCallback(
    async (loadingCtrl) => {
      if (profile?.address) {
        if (loadingCtrl) {
          setLoadingOpen(true);
        }
        await new Promise((r) => setTimeout(r, 1000));
        const res = await getKnightSafeProfile(profile.address, chain);
        console.log("Profile res:", res);
        if (!isEmpty(res)) {
          setProfile(() => res);
        }
        if (loadingCtrl) {
          setLoadingOpen(false);
        }
      }
    },
    [chain, profile?.address, setLoadingOpen, setProfile]
  );

  return refresh;
};

export default useRefreshProfile;
