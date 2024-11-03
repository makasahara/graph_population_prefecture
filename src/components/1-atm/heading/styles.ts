import { css } from "@emotion/react";
import { fontSize, mediaQuerySp } from "../../../util/defineCss";

const style = css({
  margin: "0",
  fontSize: fontSize.heading.pc,
  [mediaQuerySp]: {
    fontSize: fontSize.heading.sp,
  },
});

export { style };
