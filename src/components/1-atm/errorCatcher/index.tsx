/** @jsxImportSource @emotion/react */
import { ErrorBoundary } from "react-error-boundary";
import Error from "../error";
import type { SerializedStyles } from "@emotion/react";

const ErrorCatcher = ({
  children,
  customContainerStyle,
}: {
  children: React.ReactNode;
  customContainerStyle?: SerializedStyles;
}) => {
  return (
    <ErrorBoundary
      fallback={
        <div css={customContainerStyle}>
          <Error />
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};

export default ErrorCatcher;
