import apiClient from "./api";
import { User, AuthResponse, ApiResponse } from "../types";
import { tokenStorage } from "./tokenStorage";

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export const authService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        credentials
      );

      if (response.data.data) {
        const { token, user } = response.data.data;
        await tokenStorage.setItemAsync("auth_token", token);
        return response.data.data;
      }
      throw new Error("Invalid response from server");
    } catch (error) {
      throw error;
    }
  },

  async signup(userData: SignupRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<ApiResponse<AuthResponse>>(
        "/auth/signup",
        userData
      );

      if (response.data.data) {
        const { token, user } = response.data.data;
        await tokenStorage.setItemAsync("auth_token", token);
        return response.data.data;
      }
      throw new Error("Invalid response from server");
    } catch (error) {
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      await tokenStorage.deleteItemAsync("auth_token");
      await tokenStorage.deleteItemAsync("refresh_token");
    }
  },

  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClient.get<ApiResponse<User>>("/auth/me");
      if (response.data.data) {
        return response.data.data;
      }
      throw new Error("Failed to fetch current user");
    } catch (error) {
      throw error;
    }
  },

  async updateProfile(
    userId: string,
    updates: Partial<User>
  ): Promise<User> {
    try {
      const response = await apiClient.put<ApiResponse<User>>(
        `/users/${userId}`,
        updates
      );
      if (response.data.data) {
        return response.data.data;
      }
      throw new Error("Failed to update profile");
    } catch (error) {
      throw error;
    }
  },
};
