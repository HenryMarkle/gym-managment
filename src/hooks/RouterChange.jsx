import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useRouteChange = () => {
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      setCurrentPath(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    handleRouteChange(router.asPath); // Set initial path

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return currentPath;
};
