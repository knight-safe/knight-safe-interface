import { useRecoilState } from "recoil";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { isNil } from "lodash";
import profileState from "../atom/profileState";
import { disconnectAllWC } from "../utils/createWalletConnect";

const useLogout = () => {
  const [profile, setProfile] = useRecoilState(profileState);
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    navigate("/onboarding");
    if (!isNil(profile)) {
      setProfile(null);
      await disconnectAllWC();
    }
  }, [navigate, profile, setProfile]);

  return logout;
};

export default useLogout;
