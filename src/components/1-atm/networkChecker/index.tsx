/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import Text from "../text";

const NetworkChecker = ({ children }: { children: React.ReactNode }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // クリーンアップ関数
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return <>{isOnline ? children : <Text>ネットワークがオフラインです</Text>}</>;
};

export default NetworkChecker;