/** @jsxImportSource @emotion/react */
import { Suspense } from "react";
import Loading from "../loading";
import type { SerializedStyles } from "@emotion/react";
import type { Children } from "../../../util/types";

const LoadingBoundary = ({
  children,
  customContainerStyle,
}: {
  children: Children;
  customContainerStyle?: SerializedStyles;
}) => {
  return (
    <Suspense
      fallback={
        <div css={customContainerStyle}>
          <Loading />
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default LoadingBoundary;
