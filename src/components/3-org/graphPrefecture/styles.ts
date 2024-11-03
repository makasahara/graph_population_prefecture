import { css } from "@emotion/react";
import { mediaQuerySp } from "../../../util/defineCss";

const customContainerStyle = css({
  width: "96%",
  height: "300px",
  margin: "0 auto",
  [mediaQuerySp]: {
    width: "100%",
    height: "200px",
  },
});

export { customContainerStyle };
