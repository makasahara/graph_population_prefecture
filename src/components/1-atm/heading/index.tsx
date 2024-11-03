/** @jsxImportSource @emotion/react */
import { style } from "./styles";

const Heading = ({ children }: { children: React.ReactNode }) => {
  return <h1 css={style}>{children}</h1>;
};

export default Heading;
