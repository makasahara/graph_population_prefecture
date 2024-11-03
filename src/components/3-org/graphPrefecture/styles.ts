import { css } from "@emotion/react";
import { mediaQuerySp } from "../../../util/defineCss";

const containerStyleGraph = css({
  width: "96%",
  height: "300px",
  margin: "0 auto",
  [mediaQuerySp]: {
    width: "100%",
    height: "200px",
  },
});

const containerStyleSelectBox = css({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  margin: "20px 0",
});

export { containerStyleGraph, containerStyleSelectBox };
