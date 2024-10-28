import { css } from "@emotion/react";

const formContainerStyle = css({
  width: "100%",
  marginTop: "20px",
});

const graphContainerStyle = css({
  width: "100%",
  marginTop: "40px",
});

const loadingContainerStyle = css({
  minHeight: "300px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const errorContainerStyle = css({
  minHeight: "300px",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export {
  formContainerStyle,
  graphContainerStyle,
  loadingContainerStyle,
  errorContainerStyle,
};
