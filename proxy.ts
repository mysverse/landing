import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except Next.js internals, static files (those with a
  // dot, e.g. /favicon.ico), and the standalone short-link redirects handled in
  // next.config.ts (so the i18n proxy doesn't prepend a locale to them).
  // Non-localized paths like /contribute are caught here and redirected to the
  // default locale (e.g. /en/contribute).
  matcher: [
    "/((?!_next|_vercel|pdrm-collab-slides|pdrm-collab-doc|.*\\..*).*)"
  ]
};
