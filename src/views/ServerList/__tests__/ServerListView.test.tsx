import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ServerListView } from "../ServerList";
import { useAuth } from "../../../hooks/useAuth";
import { useQuery } from "react-query";
import { type TServer } from "../../../types";
import { vi, Mock } from "vitest";
import { AuthProvider } from "../../../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

const mockLogout = vi.fn();

const mockServers: TServer[] = [
  { name: "Server A ", distance: 300 },
  { name: "Server B ", distance: 100 },
  { name: "Server C ", distance: 200 },
];

describe("ServerListViewView", () => {
  const setupTest = () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <ServerListView />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({
      token: "test-token",
      logout: mockLogout,
    });
  });

  vi.mock("react-query", () => ({
    useQuery: vi.fn(),
  }));

  vi.mock("../../../hooks/useAuth", () => ({
    useAuth: vi.fn(),
  }));

  it("renders loading state", () => {
    (useQuery as Mock).mockReturnValue({ isLoading: true });

    setupTest();
    const serversLoader = screen.getByLabelText("serversLoader");
    expect(serversLoader).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useQuery as Mock).mockReturnValue({ isLoading: false, error: true });

    setupTest();

    const serversError = screen.getByLabelText("serversError");

    expect(serversError).toBeInTheDocument();
  });

  it("renders server list sorted by distance by default", () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
      data: mockServers,
    });

    setupTest();

    const serverItems = screen.getAllByLabelText("server");

    expect(serverItems[0]).toHaveTextContent("Server B");
    expect(serverItems[1]).toHaveTextContent("Server C");
    expect(serverItems[2]).toHaveTextContent("Server A");
  });

  it("sorts server list by name when selected", async () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
      data: mockServers,
    });

    setupTest();

    const sortSelect = screen.getByLabelText("sortByList");

    fireEvent.change(sortSelect, { target: { value: "name" } });

    await waitFor(() => {
      const serverItems = screen.getAllByLabelText("server");

      expect(serverItems[0]).toHaveTextContent("Server A");
      expect(serverItems[1]).toHaveTextContent("Server B");
      expect(serverItems[2]).toHaveTextContent("Server C");
    });
  });

  it("calls logout function on logout button click", () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
      data: mockServers,
    });

    setupTest();

    const logoutButton = screen.getByText(/logout/i);

    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});
