const DEFAULT_REDIRECT = "/";

const BLOCKED_PREFIXES = ["/login", "/register", "/select-role","/verify-account", "/unauthorized"];

export const getSafeRedirect = (
  redirect: string | null | undefined,
  fallback: string = DEFAULT_REDIRECT
) => {
  if (!redirect) return fallback;

  if (!redirect.startsWith("/") || redirect.startsWith("//")) return fallback;

  if (BLOCKED_PREFIXES.some((prefix) => redirect.startsWith(prefix))) {
    return fallback;
  }

  return redirect;
};

export const buildLoginUrl = (currentPath: string) =>
  `/login?redirect=${encodeURIComponent(currentPath)}`;



export const withRedirect = (path: string, redirect?: string | null) => {
  const safeRedirect = getSafeRedirect(redirect, "");
  if (!safeRedirect) return path;

  const separator = path.includes("?") ? "&" : "?";
  return `${path}${separator}redirect=${encodeURIComponent(safeRedirect)}`;
};