import { css } from "@emotion/react";
import { colors } from "../../../util/defineCss";

const labelStyle = css({
  display: "flex",
  alignItems: "center",
  "&:hover": {
    cursor: "pointer",
  },
});

const checkboxStyle = css({
  position: "relative",
  width: "18px",
  height: "18px",
  appearance: "none",
  background: colors.white,
  border: `solid 2px ${colors.border}`,
  borderRadius: "4px",
  boxShadow: "0 0 0 0 transparent",
  margin: "0 4px 0 0",
  "@media (forced-colors: active)": {
    transition: "none",
    borderColor: "CanvasText",
    "&::before": {
      transition: "none",
      backgroundColor: "CanvasText",
    },
  },
  "&:checked": {
    background: colors.primary,
    borderColor: colors.primary,
    "@media (forced-colors: active)": {
      backgroundColor: "Canvas",
      borderColor: "CanvasText",
    },
  },

  "&::before": {
    position: "absolute",
    inset: "0",
    display: "block",
    width: "100%",
    height: "100%",
    content: '""',
    opacity: 0,
    maskImage: "url('icon.svg')",
    maskRepeat: "no-repeat",
    maskSize: "contain",
    backgroundColor: colors.white,
    transition: "opacity 0.2s",
  },
  "&:checked::before": {
    opacity: 1,
  },
});

function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
  if (event.key === "Enter") {
    event.preventDefault();
    (event.target as HTMLInputElement).click();
  }
}

export { labelStyle, checkboxStyle, handleKeyDown };
