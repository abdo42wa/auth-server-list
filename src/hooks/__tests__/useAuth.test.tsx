import { renderHook, act } from "@testing-library/react";
import { useAuth } from "../useAuth";
import { AuthProvider } from "../../contexts/AuthContext";
import { vi } from "vitest";
import { localStorageMock } from "../../mocks/localStorageMock";

describe("useAuth hook", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", localStorageMock);
    localStorageMock.clear();
  });

  it("provides login function that updates token", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.login("new-token");
    });

    expect(result.current.token).toBe("new-token");
    expect(result.current.isAuthenticated).toBe(true);
    expect(localStorageMock.setItem).toHaveBeenCalledWith("token", "new-token");
  });

  it("provides logout function that clears token", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.login("test-token");
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.token).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("token");
  });

  it("maintains consistent token state across re-renders", () => {
    const { result, rerender } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.login("test-token");
    });

    rerender();

    expect(result.current.token).toBe("test-token");
    expect(result.current.isAuthenticated).toBe(true);
  });
});
