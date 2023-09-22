import React from "react";
import { NavLink, useSearchParams } from "react-router-dom";

const NavAppLink = ({ children, to, ...props }) => {
  const [search] = useSearchParams();
  return (
    <NavLink {...props} to={search.size ? `${to}?${search.toString()}` : to}>
      {children}
    </NavLink>
  );
};

export default NavAppLink;
