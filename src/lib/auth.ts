export function hasAuthToken(): boolean {
  if (typeof document === "undefined") return false;

  return document.cookie
    .split(";")
    .some((cookie) => {
      const [name, ...value] = cookie.trim().split("=");
      return name === "token" && value.join("=").length > 0;
    });
}

export function getSafeRedirectPath(search: string): string {
  const nextPath = new URLSearchParams(search).get("next");
  return nextPath?.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/";
}
