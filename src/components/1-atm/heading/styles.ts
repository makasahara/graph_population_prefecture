import { css } from "@emotion/react";
import { mediaQuerySp, fontSize, fontWeight } from "../../../util/defineCss";

const style = css({
  margin: "0",
  fontWeight: fontWeight.heading,
  fontSize: fontSize.heading.pc,
  [mediaQuerySp]: {
    fontSize: fontSize.heading.sp,
  },
});

export { style };
