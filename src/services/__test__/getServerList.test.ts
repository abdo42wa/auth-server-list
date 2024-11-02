import axios from "axios";
import { vi } from "vitest";

import { mockServers } from "../../mocks/mockServers";
import { getServerList } from "../getServerList";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getServerList", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        vi.clearAllMocks();
        process.env.API_SERVICE_URL = 'https://fakeapi.com/servers';
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    const API_SERVICE_URL = "https://fakeapi.com/servers";
    const testToken = "test-token";

    it("should return a list of servers when API call is successful", async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: mockServers,
            status: 200
        });

        const result = await getServerList(testToken);

        expect(result).toEqual(mockServers);
        expect(mockedAxios.get).toHaveBeenCalledWith(API_SERVICE_URL, {
            headers: { Authorization: `Bearer ${testToken}` },
        });
    });

    it("should throw an error when API call fails", async () => {
        mockedAxios.get.mockRejectedValue(new Error("Network error"));

        await expect(getServerList(testToken)).rejects.toThrow("Network error");
    });

    it("should throw an error if API_SERVERS_URL is not set", async () => {
        delete process.env.API_SERVERS_URL;

        await expect(getServerList(testToken)).rejects.toThrow();
    });
});
