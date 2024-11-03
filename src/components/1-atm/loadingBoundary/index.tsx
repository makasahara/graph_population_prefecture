/** @jsxImportSource @emotion/react */
import { Suspense } from "react";
import Loading from "../loading";
import type { SerializedStyles } from "@emotion/react";

const LoadingBoundary = ({
  children,
  customContainerStyle,
}: {
  children: React.ReactNode;
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
