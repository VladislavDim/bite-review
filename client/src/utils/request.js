import { triggerLogout } from "./logoutDispatcher";

const request = async (method, url, data, options = {}) => {
  if (method !== "GET") {
    options.method = method;
  }

  if (data instanceof FormData) {
    options = { ...options, body: data };
  } else if (data) {
    options = {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: JSON.stringify(data),
    };
  }

  const response = await fetch(url, options);

  const contentType = response.headers.get("Content-Type");
  const result = contentType?.includes("application/json")
    ? await response.json().catch(() => ({}))
    : null;

  if (response.status === 401 && !url.endsWith("/login")) {
    triggerLogout(); 
    return;
  }

  if (!response.ok) {
    const message = result?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return result;
};

export default {
  get: request.bind(null, "GET"),
  post: request.bind(null, "POST"),
  put: request.bind(null, "PUT"),
  delete: request.bind(null, "DELETE"),
  baseRequest: request,
};
