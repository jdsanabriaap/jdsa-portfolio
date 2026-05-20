"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

/** Syncs document `lang` with the active next-intl locale. */
export function LangSetter() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
