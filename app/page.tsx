import { redirect } from "next/navigation";
import { defaultLocale } from "@/i18n/routing";

/** Redirect root to default locale. */
export default function RootPage() {
  redirect(`/${defaultLocale}`);
}
