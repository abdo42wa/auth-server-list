import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, renderHook, act } from "@testing-library/react";
import { AuthProvider } from "../AuthContext";
import { useAuth } from "../../hooks/useAuth";

describe("AuthContext & useAuth", () => {
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

  describe("AuthProvider", () => {
    it("renders children correctly", () => {
      render(
        <AuthProvider>
          <div data-testid="child">Child Component</div>
        </AuthProvider>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("initializes with token from localStorage", () => {
      localStorageMock.setItem("token", "test-token");

      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      expect(result.current.token).toBe("test-token");
      expect(result.current.isAuthenticated).toBe(true);
    });

    it("initializes with null token when localStorage is empty", () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: AuthProvider,
      });

      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  it("persists token in localStorage across provider remounts", () => {
    const { result, unmount } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    act(() => {
      result.current.login("persist-token");
    });
    unmount();

    const { result: newResult } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    expect(newResult.current.token).toBe("persist-token");
    expect(newResult.current.isAuthenticated).toBe(true);
  });
});
