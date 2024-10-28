/** @jsxImportSource @emotion/react */
import { ErrorBoundary } from "react-error-boundary";
import Error from "../error";
import type { SerializedStyles } from "@emotion/react";
import type { Children } from "../../../util/types";

const ErrorCatcher = ({
  children,
  customContainerStyle,
}: {
  children: Children;
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
