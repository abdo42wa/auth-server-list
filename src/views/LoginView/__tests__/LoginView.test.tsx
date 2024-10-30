import { Login } from "../LoginView";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Login Component", () => {
  const setup = () => {
    render(<Login />);

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
    const { usernameInput, passwordInput, submitButton } = setup();

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should shows validation error for empty username", async () => {
    const { submitButton } = setup();

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("username is required")).toBeInTheDocument();
    });
  });

  it("should shows validation error for short username", async () => {
    const { usernameInput, submitButton } = setup();

    await userEvent.type(usernameInput, "abc");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("username must be at least 4 characters")
      ).toBeInTheDocument();
    });
  });

  it("should shows validation error for empty password", async () => {
    const { usernameInput, submitButton } = setup();

    await userEvent.type(usernameInput, "validuser");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Password is required")).toBeInTheDocument();
    });
  });

  it("should shows validation error for short password", async () => {
    const { usernameInput, passwordInput, submitButton } = setup();

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
    const { passwordInput } = setup();
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("should applies correct CSS classes for styling", () => {
    const { usernameInput, passwordInput, submitButton } = setup();

    expect(usernameInput).toHaveClass("rounded-lg", "bg-gray-200");
    expect(passwordInput).toHaveClass("rounded-lg", "bg-gray-200");
    expect(submitButton).toHaveClass("bg-blue-600");
  });
});