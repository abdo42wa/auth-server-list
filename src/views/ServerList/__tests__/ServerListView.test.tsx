import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useQuery } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Mock, vi } from "vitest";

import { ProvideAuth } from "../../../contexts/AuthContext";
import { mockServers } from "../../../mocks/mockServers";
import { ServerList } from "../ServerList";

describe("ServerListViewView", () => {
  const setupTest = () => {
    render(
      <BrowserRouter>
        <ProvideAuth>
          <ServerList />
        </ProvideAuth>
      </BrowserRouter>
    );
  };

  vi.mock("react-query", () => ({
    useQuery: vi.fn(),
  }));

  vi.mock("../../../hooks/useAuth", () => ({
    useAuth: vi.fn(),
  }));

  it("should renders loading state", () => {
    (useQuery as Mock).mockReturnValue({ isLoading: true });

    setupTest();
    const serversLoader = screen.getByLabelText("loader");
    expect(serversLoader).toBeInTheDocument();
  });

  it("should renders server list without sorting", () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
      data: mockServers,
    });

    setupTest();

    const serverItems = screen.getAllByLabelText("server");

    expect(serverItems[0]).toHaveTextContent("Server A");
    expect(serverItems[1]).toHaveTextContent("Server B");
    expect(serverItems[2]).toHaveTextContent("Server C");
  });

  it("should sorts server list by distance when selected", async () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
      data: mockServers,
    });

    setupTest();

    const sortSelect = screen.getByLabelText("sortByList");

    userEvent.selectOptions(sortSelect, "distance");

    await waitFor(() => {
      const serverItems = screen.getAllByLabelText("server");

      expect(serverItems[0]).toHaveTextContent("Server B");
      expect(serverItems[1]).toHaveTextContent("Server C");
      expect(serverItems[2]).toHaveTextContent("Server A");
    });
  });

  it("should sorts server list by name when selected", async () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
      data: mockServers,
    });

    setupTest();

    const sortSelect = screen.getByLabelText("sortByList");

    userEvent.selectOptions(sortSelect, "name");

    await waitFor(() => {
      const serverItems = screen.getAllByLabelText("server");

      expect(serverItems[0]).toHaveTextContent("Server A");
      expect(serverItems[1]).toHaveTextContent("Server B");
      expect(serverItems[2]).toHaveTextContent("Server C");
    });
  });

  it("should render the distance filter", async () => {
    setupTest();
    const filterButton = screen.getByLabelText("distanceFilterButton");
    userEvent.click(filterButton);

    await waitFor(() => {
      const distanceFilterContainer = screen.getByLabelText("distanceFilterContainer");
      const distanceFilterInput = screen.getByLabelText("distanceFilterInput");

      expect(filterButton).toBeVisible();
      expect(distanceFilterContainer).toBeVisible();
      expect(distanceFilterInput).toBeVisible();
    });
  });

  it("should render the server list with max distance", async () => {
    (useQuery as Mock).mockReturnValue({
      isLoading: false,
      data: mockServers
    });

    setupTest();

    const filterButton = screen.getByLabelText("distanceFilterButton");
    await userEvent.click(filterButton);

    const distanceFilterInput = screen.getByLabelText("distanceFilterInput");

    await userEvent.type(distanceFilterInput, "100");

    await waitFor(() => {
      const serverItems = screen.getAllByLabelText("server");
      expect(serverItems).toHaveLength(1);
    });

  });
});
