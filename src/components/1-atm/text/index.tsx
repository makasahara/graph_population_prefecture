/** @jsxImportSource @emotion/react */
import { style } from "./styles";

const Text = ({ children }: { children: React.ReactNode }) => {
  return <p css={style}>{children}</p>;
};

export default Text;
