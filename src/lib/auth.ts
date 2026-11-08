export function hasAuthToken(): boolean {
  if (typeof document === "undefined") return false;

  return document.cookie
    .split(";")
    .some((cookie) => {
      const [name, ...value] = cookie.trim().split("=");
      return name === "token" && value.join("=").length > 0;
    });
}

export function storeAuthToken(token: string): void {
  if (typeof document === "undefined") return;
  document.cookie = `token=${token}; path=/; max-age=604800`;
}

export function getSafeRedirectPath(search: string): string {
  const nextPath = new URLSearchParams(search).get("next");
  return nextPath?.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/";
}
