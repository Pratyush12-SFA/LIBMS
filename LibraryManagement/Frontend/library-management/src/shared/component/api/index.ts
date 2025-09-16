const API_ROOT = "https://localhost:7260/api/";

export async function get<T>(url: string) {
  return await request<T>("get", url);
}

export async function post<T>(url: string, body: unknown) {
  return await request<T>("post", url, body);
}

export async function put<T>(url: string, body: unknown) {
  return await request<T>("put", url, body);
}

export async function del<T>(url: string) {
  return await request<T>("delete", url);
}

async function request<T>(method: string, url: string, body?: unknown) {
  try {
    const response = await fetch(`${API_ROOT}${url}`, {
      method: method,
      body: body ? JSON.stringify(body) : undefined,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 400) {
      alert("Validation failed.");
      return undefined;
    }
    if (response.status === 401) {
      alert("User is not logged on.");
      return undefined;
    }
    if (response.status === 403) {
      alert("Access denied.");
      return undefined;
    }
    if (response.status === 404) {
      const text = await response.text();
      throw Error(text);
    }

    if (response.status === 400) {
      alert("Validation failed");
      return undefined;
    }

    return await getJsonOrUndefined<T>(response);
  } catch (error) {
    alert(error);
    return undefined;
  }
}

async function getJsonOrUndefined<T>(response: Response) {
  try {
    const result = await response.json();
    return result as T;
  } catch {
    return undefined;
  }
}
