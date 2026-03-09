import React from "react";
import { Link } from "react-router-dom";
import { useAppLanguage } from "../context/AppLanguageContext";
import { uiLanguageOptions } from "../i18n/uiText";

function TitleBar({ children }) {
  const { language, setLanguage, t } = useAppLanguage();

  return (
    <nav className="title-bar card modern-card" aria-label={t("uiLanguage")}>
      <Link className="title-brand-wrap title-home-link" to="/" aria-label={t("navHome")}>
        <div className="logo-mark title-logo" aria-hidden="true">
          ዳ
        </div>
        <p className="title-brand">ዳዋሊንቆ</p>
      </Link>
      <div className="title-links title-tools">
        <label className="ui-language-label" htmlFor="ui-language-select">
          {t("uiLanguage")}
        </label>
        <select
          id="ui-language-select"
          className="ui-language-select"
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        >
          {uiLanguageOptions.map((item) => (
            <option key={item.code} value={item.code}>
              {item.label}
            </option>
          ))}
        </select>
        {children}
      </div>
    </nav>
  );
}

export default TitleBar;
