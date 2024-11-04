/** @jsxImportSource @emotion/react */
import Heading from "../../1-atm/heading";
import { containerStyle } from "./styles";

const TitleArea = ({ children }: { children: React.ReactNode }) => {
  return (
    <div css={containerStyle}>
      <Heading>{children}</Heading>
    </div>
  );
};

export default TitleArea;
