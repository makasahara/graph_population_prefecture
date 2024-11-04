import { css } from "@emotion/react";
import { mediaQuerySp } from "../../../util/defineCss";

const containerStyleGraph = css({
  width: "96%",
  height: "320px",
  margin: "0 auto",
  [mediaQuerySp]: {
    width: "100%",
    height: "calc(100vh - 72px)",
  },
});

const containerStyleSelectBox = css({
  display: "flex",
  justifyContent: "center",
  margin: "20px 0",
});

export { containerStyleGraph, containerStyleSelectBox };
