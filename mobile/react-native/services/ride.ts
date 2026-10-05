import apiClient from "./api";
import { FareEstimate, Ride, ApiResponse } from "@types/index";
import { Location } from "@types/index";

interface BookRideRequest {
  pickupLocation: Location;
  dropoffLocation: Location;
  rideType: "economy" | "comfort" | "premium";
  scheduledTime?: string;
}

export const rideService = {
  async estimateFare(
    pickupLocation: Location,
    dropoffLocation: Location,
    rideType: "economy" | "comfort" | "premium" = "economy"
  ): Promise<FareEstimate> {
    try {
      const response = await apiClient.get<ApiResponse<FareEstimate>>(
        "/rides/estimate",
        {
          params: {
            pickupLat: pickupLocation.latitude,
            pickupLng: pickupLocation.longitude,
            dropoffLat: dropoffLocation.latitude,
            dropoffLng: dropoffLocation.longitude,
            rideType,
          },
        }
      );

      if (response.data.data) {
        return response.data.data;
      }
      throw new Error("Failed to estimate fare");
    } catch (error) {
      throw error;
    }
  },

  async bookRide(request: BookRideRequest): Promise<Ride> {
    try {
      const response = await apiClient.post<ApiResponse<Ride>>(
        "/rides/book",
        request
      );

      if (response.data.data) {
        return response.data.data;
      }
      throw new Error("Failed to book ride");
    } catch (error) {
      throw error;
    }
  },

  async getRideDetails(rideId: string): Promise<Ride> {
    try {
      const response = await apiClient.get<ApiResponse<Ride>>(
        `/rides/${rideId}`
      );

      if (response.data.data) {
        return response.data.data;
      }
      throw new Error("Failed to fetch ride details");
    } catch (error) {
      throw error;
    }
  },

  async getUserRides(
    userId: string,
    status?: string,
    limit: number = 10
  ): Promise<Ride[]> {
    try {
      const response = await apiClient.get<ApiResponse<Ride[]>>(
        `/users/${userId}/rides`,
        {
          params: { status, limit },
        }
      );

      if (response.data.data) {
        return response.data.data;
      }
      return [];
    } catch (error) {
      throw error;
    }
  },

  async cancelRide(rideId: string, reason?: string): Promise<Ride> {
    try {
      const response = await apiClient.post<ApiResponse<Ride>>(
        `/rides/${rideId}/cancel`,
        { reason }
      );

      if (response.data.data) {
        return response.data.data;
      }
      throw new Error("Failed to cancel ride");
    } catch (error) {
      throw error;
    }
  },
};
