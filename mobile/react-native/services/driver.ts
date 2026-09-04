import apiClient from "./api";
import { Driver, ApiResponse } from "@types/index";

interface DriverRegistrationRequest {
  name: string;
  email: string;
  phone: string;
  vehicleType: "Keke" | "Car" | "Bus";
  plateNumber: string;
  licenseNumber: string;
  yearsExperience: number;
  homeBaseCity: string;
  interstateAvailability: boolean;
}

export const driverService = {
  async registerDriver(
    data: DriverRegistrationRequest
  ): Promise<Driver> {
    try {
      const response = await apiClient.post<ApiResponse<Driver>>(
        "/drivers/register",
        data
      );

      if (response.data.data) {
        return response.data.data;
      }
      throw new Error("Failed to register as driver");
    } catch (error) {
      throw error;
    }
  },

  async getDriverProfile(driverId: string): Promise<Driver> {
    try {
      const response = await apiClient.get<ApiResponse<Driver>>(
        `/drivers/${driverId}`
      );

      if (response.data.data) {
        return response.data.data;
      }
      throw new Error("Failed to fetch driver profile");
    } catch (error) {
      throw error;
    }
  },

  async updateDriverProfile(
    driverId: string,
    updates: Partial<Driver>
  ): Promise<Driver> {
    try {
      const response = await apiClient.put<ApiResponse<Driver>>(
        `/drivers/${driverId}`,
        updates
      );

      if (response.data.data) {
        return response.data.data;
      }
      throw new Error("Failed to update driver profile");
    } catch (error) {
      throw error;
    }
  },

  async uploadDriverDocument(
    driverId: string,
    documentType: string,
    filePath: string
  ): Promise<{ url: string }> {
    try {
      const formData = new FormData();
      formData.append("document", {
        uri: filePath,
        type: "application/pdf",
        name: `${documentType}.pdf`,
      } as any);
      formData.append("documentType", documentType);

      const response = await apiClient.post<ApiResponse<{ url: string }>>(
        `/drivers/${driverId}/documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.data) {
        return response.data.data;
      }
      throw new Error("Failed to upload document");
    } catch (error) {
      throw error;
    }
  },
};
