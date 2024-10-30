import { renderHook, act } from "@testing-library/react";
import { useAuth } from "../useAuth";
import { AuthProvider } from "../../contexts/AuthContext";
import { vi } from "vitest";

describe("useAuth hook", () => {
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };
  })();

  beforeEach(() => {
    vi.stubGlobal("localStorage", localStorageMock);
    localStorageMock.clear();
  });

  // it("throws error when used outside of AuthProvider", () => {
  //   const { result } = renderHook(() => useAuth());

  //   expect(result).toThrow("useAuth must be used within an AuthProvider");
  // });

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
