/** @jsxImportSource @emotion/react */
import { style } from "./styles";
import type { Children } from "../../../util/types";

const Text = ({ children }: { children: Children }) => {
  return <p css={style}>{children}</p>;
};

export default Text;
