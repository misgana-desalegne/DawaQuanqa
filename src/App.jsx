import React, { useEffect, useRef } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import InfoPage from "./components/InfoPage";
import { AppLanguageProvider, useAppLanguage } from "./context/AppLanguageContext";
import LandingPage from "./pages/LandingPage";
import LearningPage from "./pages/LearningPage";

function AppRoutes() {
  const { t } = useAppLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const handledReloadRedirectRef = useRef(false);

  useEffect(() => {
    if (handledReloadRedirectRef.current) {
      return;
    }

    handledReloadRedirectRef.current = true;
    const entries = globalThis.performance?.getEntriesByType?.("navigation") || [];
    const isReload = entries[0]?.type === "reload";

    if (isReload && location.pathname !== "/") {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/learn" element={<LearningPage />} />
      <Route
        path="/signup"
        element={
          <InfoPage
            title={t("signupTitle")}
            description={t("signupBody")}
            primaryCtaLabel={t("createAccount")}
          />
        }
      />
      <Route
        path="/login"
        element={
          <InfoPage
            title={t("loginTitle")}
            description={t("loginBody")}
            primaryCtaLabel={t("loginAction")}
          />
        }
      />
      <Route
        path="/about"
        element={
          <InfoPage
            title={t("aboutTitle")}
            description={t("aboutBody")}
            primaryCtaLabel={t("startLearning")}
            primaryCtaPath="/"
          />
        }
      />
      <Route path="/donate" element={<Navigate to="/" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AppLanguageProvider>
      <AppRoutes />
    </AppLanguageProvider>
  );
}

export default App;
