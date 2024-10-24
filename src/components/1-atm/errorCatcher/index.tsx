import { ErrorBoundary } from "react-error-boundary";
import Error from "../error";
import type { Children } from "../../../util/types";

const ErrorCatcher = ({ children }: { children: Children }) => {
  return <ErrorBoundary fallback={<Error />}>{children}</ErrorBoundary>;
};

export default ErrorCatcher;
