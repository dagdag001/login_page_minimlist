const STORAGE_KEY = "auth_token";

export function getToken() {
  return sessionStorage.getItem(STORAGE_KEY);
}

export function setAuthToken(token) {
  sessionStorage.setItem(STORAGE_KEY, token);
}

export function clearSession() {
  sessionStorage.removeItem(STORAGE_KEY);
}
