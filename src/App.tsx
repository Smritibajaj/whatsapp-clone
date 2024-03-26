import React from "react";
import AppRoutes from "@app/routes";
import useAppLoad from "@app/common/hooks/useAppLoad";
const SplashPage = React.lazy(() => import("@app/pages/splash"));

export default function App() {
  const { isLoaded, progress } = useAppLoad();

  if (!isLoaded) return <SplashPage progress={progress} />;
  return <AppRoutes />;
}
