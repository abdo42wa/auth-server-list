import { act, render, renderHook, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { localStorageMock } from "../../mocks/localStorageMock";
import { ProvideAuth, useAuth } from "../AuthContext";

vi.mock("../../services/getAuthToken", () => ({
  getAuthToken: vi.fn(() => Promise.resolve("persist-token")),
}));

describe("AuthContext & useAuth", () => {
  beforeEach(() => {
    vi.stubGlobal("localStorage", localStorageMock);
    localStorageMock.clear();
  });

  describe("AuthProvider", () => {
    it("renders children correctly", () => {
      render(
        <BrowserRouter>
          <ProvideAuth>
            <div data-testid="child">Child Component</div>
          </ProvideAuth>
        </BrowserRouter>
      );
      expect(screen.getByTestId("child")).toBeInTheDocument();
    });

    it("initializes with token from localStorage", () => {
      localStorageMock.setItem("token", "test-token");
      const { result } = renderHook(() => useAuth(), {
        wrapper: ({ children }) => (
          <BrowserRouter>
            <ProvideAuth>{children}</ProvideAuth>
          </BrowserRouter>
        ),
      });

      expect(result.current.authToken).toBe("test-token");
    });

    it("initializes with null token when localStorage is empty", () => {
      const { result } = renderHook(() => useAuth(), {
        wrapper: ({ children }) => (
          <BrowserRouter>
            <ProvideAuth>{children}</ProvideAuth>
          </BrowserRouter>
        ),
      });

      expect(result.current.authToken).toBeNull();
    });
  });

  it("persists token in localStorage across provider remounts", async () => {
    const { result, unmount } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <BrowserRouter>
          <ProvideAuth>{children}</ProvideAuth>
        </BrowserRouter>
      ),
    });

    const onSuccess = vi.fn();
    const onError = vi.fn();

    await act(async () => {
      await result.current.signIn({
        username: "username",
        password: "password",
        onSuccess,
        onError,
      });
    });

    unmount();

    const { result: newResult } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <BrowserRouter>
          <ProvideAuth>{children}</ProvideAuth>
        </BrowserRouter>
      ),
    });

    expect(newResult.current.authToken).toBe("persist-token");
  });
});
