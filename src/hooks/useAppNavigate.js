import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

const useAppNavigate = () => {
  const navigate = useNavigate();
  const [search] = useSearchParams();

  const nav = useCallback(
    async (path, opt) =>
      navigate(
        { pathname: path, search: search.size ? search.toString() : "" },
        opt
      ),
    [navigate, search]
  );

  return nav;
};

export default useAppNavigate;
