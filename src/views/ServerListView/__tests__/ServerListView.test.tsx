import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ServersList } from "../ServerListView";
import { useAuth } from "../../../hooks/useAuth";
import { useQuery } from "react-query";
import { TServer } from "../../../types/types";
import { vi, Mock } from "vitest";
import { AuthProvider } from "../../../contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";

const mockLogout = vi.fn();
const mockServers: TServer[] = [
  { name: "Server A ", distance: 300 },
  { name: "Server B ", distance: 100 },
  { name: "Server C ", distance: 200 },
];

describe("ServersList", () => {
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

    render(
      <BrowserRouter>
        <AuthProvider>
          <ServersList />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useQuery as Mock).mockReturnValue({ isLoading: false, error: true });

    render(
      <BrowserRouter>
        <AuthProvider>
          <ServersList />
        </AuthProvider>
      </BrowserRouter>
    );

    expect(screen.getByText(/error loading servers/i)).toBeInTheDocument();
  });

  it("renders server list sorted by distance by default", () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
      data: mockServers,
    });

    render(
      <BrowserRouter>
        <AuthProvider>
          <ServersList />
        </AuthProvider>
      </BrowserRouter>
    );

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

    render(
      <BrowserRouter>
        <AuthProvider>
          <ServersList />
        </AuthProvider>
      </BrowserRouter>
    );

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

    render(
      <BrowserRouter>
        <AuthProvider>
          <ServersList />
        </AuthProvider>
      </BrowserRouter>
    );

    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});
