import { Suspense } from "react";
import Loading from "../loading";
import type { Children } from "../../../util/types";

const LoadingBoundary = ({ children }: { children: Children }) => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

export default LoadingBoundary;
