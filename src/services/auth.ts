import { STRAPI_BASE_URL } from "@/lib/strapi";

export interface LoginCredentials {
  identifier: string;
  password: string;
}

export interface RegistrationDetails {
  username: string;
  email: string;
  password: string;
}

async function requestJwt(
  endpoint: string,
  payload: LoginCredentials | RegistrationDetails,
): Promise<string> {
  const response = await fetch(`${STRAPI_BASE_URL}/api/auth/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) throw new Error("Authentication request failed");

  const result: { jwt?: unknown } = await response.json();
  if (typeof result.jwt !== "string" || result.jwt.length === 0) {
    throw new Error("Authentication response did not include a token");
  }

  return result.jwt;
}

export function loginWithPassword(credentials: LoginCredentials): Promise<string> {
  return requestJwt("local", credentials);
}

export function registerWithPassword(details: RegistrationDetails): Promise<string> {
  return requestJwt("local/register", details);
}
