import { css } from "@emotion/react";
import { colors } from "../../../util/defineCss";

const selectBoxStyle = css({
  display: "inline-flex",
  alignItems: "center",
  position: "relative",
  "&::after": {
    position: "absolute",
    right: "15px",
    width: "10px",
    height: "7px",
    backgroundColor: "#535353",
    clipPath: "polygon(0 0, 100% 0, 50% 100%)",
    content: "''",
    pointerEvents: "none",
  },
  "& select": {
    appearance: "none",
    minWidth: "230px",
    height: "2.0rem",
    padding: ".4rem calc(.8rem + 30px) .4rem .8rem",
    border: `1px solid ${colors.border}`,
    borderRadius: "3px",
    backgroundColor: colors.white,
    color: colors.font,
    fontSize: "1rem",
    cursor: "pointer",
  },
});

export { selectBoxStyle };
