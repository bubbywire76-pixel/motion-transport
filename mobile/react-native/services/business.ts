import apiClient from "./api";
import { Business, ApiResponse } from "../types";

interface BusinessRegistrationRequest {
  companyName: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  address: string;
  city: string;
  businessType: "logistics" | "fleet" | "corporate";
  fleetSize?: number;
}

export const businessService = {
  async registerBusiness(data: BusinessRegistrationRequest): Promise<Business> {
    try {
      const response = await apiClient.post<ApiResponse<Business>>(
        "/business/register",
        data
      );

      if (response.data.data) {
        return response.data.data;
      }

      throw new Error("Failed to register business");
    } catch (error) {
      throw error;
    }
  },
};
