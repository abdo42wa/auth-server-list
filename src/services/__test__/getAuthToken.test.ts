import axios from "axios";
import { vi } from "vitest";

import { type TLoginValues } from "../../types";
import { getAuthToken } from "../getAuthToken";

vi.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getAuthToken", () => {
    const originalEnv = process.env;

    beforeEach(() => {
        vi.clearAllMocks();
        process.env.API_AUTH_URL = 'https://fakeapi.com/auth';
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    const API_AUTH_URL = "https://fakeapi.com/auth";
    const loginValues: TLoginValues = {
        username: "testuser",
        password: "password123",
    };

    it("should return a token when login is successful", async () => {
        mockedAxios.post.mockResolvedValue({
            data: { token: "test-token" },
        });

        const token = await getAuthToken(loginValues);

        expect(token).toBe("test-token");
        expect(mockedAxios.post).toHaveBeenCalledWith(
            API_AUTH_URL,
            { username: loginValues.username, password: loginValues.password },
            { headers: { "Content-Type": "application/json" } }
        );
    });

    it("should throw an error when login fails", async () => {
        mockedAxios.post.mockRejectedValue(new Error("Invalid credentials"));

        await expect(getAuthToken(loginValues)).rejects.toThrow("Invalid credentials");
    });

    it("should throw an error if API_AUTH_URL is not set", async () => {
        delete process.env.API_AUTH_URL;

        await expect(getAuthToken(loginValues)).rejects.toThrow();
    });
});
