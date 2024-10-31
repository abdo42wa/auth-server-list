import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../AuthContext";
import { useAuth } from "../../hooks/useAuth";

const TestComponent = () => {
  const { token, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? "Authenticated" : "Not authenticated"}
      </div>
      <div data-testid="token">{token || "no token"}</div>
      <button onClick={() => login("test-token")}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("Auth Integration", () => {
  it("provides auth functionality to nested components", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "Not authenticated"
    );
    expect(screen.getByTestId("token")).toHaveTextContent("no token");

    fireEvent.click(screen.getByText("Login"));
    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "Authenticated"
    );
    expect(screen.getByTestId("token")).toHaveTextContent("test-token");

    fireEvent.click(screen.getByText("Logout"));
    expect(screen.getByTestId("auth-status")).toHaveTextContent(
      "Not authenticated"
    );
    expect(screen.getByTestId("token")).toHaveTextContent("no token");
  });
});
