import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let errorText = res.statusText;
    try {
      const errorJson = await res.json();
      if (errorJson && errorJson.message) {
        errorText = errorJson.message;
      } else {
         errorText = await res.text() || res.statusText;
      }
    } catch (e) {
      // Fallback if parsing error response fails
      errorText = await res.text() || res.statusText;
    }
    throw new Error(`${res.status}: ${errorText}`);
  }
}

export async function apiRequest(
  method: string,
  url: string, // Should be a relative API path for Next.js, e.g., /api/users
  data?: unknown | undefined,
): Promise<Response> {
  const res = await fetch(url, { // Next.js handles full URL construction for API routes
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    // credentials: "include", // 'include' might not be needed depending on auth setup with Next.js API routes
  });

  await throwIfResNotOk(res);
  return res;
}

type UnauthorizedBehavior = "returnNull" | "throw";

export const getQueryFn = <T,>(options?: { // Made options optional
  on401?: UnauthorizedBehavior; // Made on401 optional
}): QueryFunction<T> => async ({ queryKey }) => {
  const unauthorizedBehavior = options?.on401 || "throw"; // Default to throw
  const res = await fetch(queryKey[0] as string, {
    // credentials: "include",
  });

  if (unauthorizedBehavior === "returnNull" && res.status === 401) {
    return null as T; // Ensure correct typing for null return
  }

  await throwIfResNotOk(res);
  return (await res.json()) as T; // Ensure correct typing for JSON response
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn(), // Call with default options
      refetchOnWindowFocus: false, // Common preference
      staleTime: 1000 * 60 * 5, // 5 minutes, adjust as needed
      retry: (failureCount, error: any) => {
        if (error.status === 404 || error.status === 401 || error.status === 403) return false; // Don't retry on these errors
        return failureCount < 2; // Retry up to 2 times for other errors
      },
    },
    mutations: {
      retry: false,
    },
  },
});
