import { css } from "@emotion/react";
import { colors } from "../../../util/defineCss";

const containerStyle = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "60px",
  color: colors.white,
  backgroundColor: colors.primary,
});

export { containerStyle };
