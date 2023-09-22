import React, { forwardRef } from "react";
import { Scrollbars } from "react-custom-scrollbars";

const ColoredScrollbar = ({
  children,
  height = 300,
  width = "100%",
  scrollbarProps,
}) => (
  <Scrollbars
    style={{ width: width, height: height }}
    renderThumbVertical={({ style, ...props }) => (
      <div
        {...props}
        style={{ ...style, backgroundColor: "rgb(145 119 255 / 50%)" }}
      />
    )}
    renderThumbHorizontal={({ style, ...props }) => (
      <div
        {...props}
        style={{ ...style, backgroundColor: "rgb(145 119 255 / 50%)" }}
      />
    )}
    {...scrollbarProps}
  >
    {children}
  </Scrollbars>
);

export default ColoredScrollbar;
