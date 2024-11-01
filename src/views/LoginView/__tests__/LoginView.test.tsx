import { LoginView } from "../Login";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../../../contexts/AuthContext";

describe("Login Component", () => {
  const setupTest = () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <LoginView />
        </AuthProvider>
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText("usernameField");
    const passwordInput = screen.getByLabelText("passwordField");
    const submitButton = screen.getByLabelText("submitButton");

    return {
      usernameInput,
      passwordInput,
      submitButton,
    };
  };
  it("should renders login form with all necessary elements", () => {
    const { usernameInput, passwordInput, submitButton } = setupTest();

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should shows validation error for empty username", async () => {
    const { submitButton } = setupTest();

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("username is required")).toBeInTheDocument();
    });
  });

  it("should shows validation error for short username", async () => {
    const { usernameInput, submitButton } = setupTest();

    await userEvent.type(usernameInput, "abc");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("username must be at least 4 characters")
      ).toBeInTheDocument();
    });
  });

  it("should shows validation error for empty password", async () => {
    const { usernameInput, submitButton } = setupTest();

    await userEvent.type(usernameInput, "validuser");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("should shows validation error for short password", async () => {
    const { usernameInput, passwordInput, submitButton } = setupTest();

    await userEvent.type(usernameInput, "validuser");
    await userEvent.type(passwordInput, "12345");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Password must be at least 6 characters")
      ).toBeInTheDocument();
    });
  });

  it("should has correct input types for security", () => {
    const { passwordInput } = setupTest();
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
