import apiClient from "@services/api";
import { serviceError } from "@services/apiErrors";

export interface FlightSearchInput {
  origin: string;
  destination: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
}

export interface FlightOffer {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureAt: string;
  arrivalAt: string;
  duration: string;
  stops: number;
  totalAmount: string;
  currency: string;
}

export interface FlightSearchResult {
  offers: FlightOffer[];
  searchId: string;
}

export async function searchFlights(
  input: FlightSearchInput,
): Promise<FlightSearchResult> {
  try {
    const response = await apiClient.post<FlightSearchResult>(
      "/travel/flights/search",
      input,
    );
    if (!response.data.searchId || !Array.isArray(response.data.offers)) {
      throw new Error("The flight service returned an invalid search response.");
    }
    return response.data;
  } catch (error) {
    throw serviceError(error, "Flight booking");
  }
}

export async function startFlightBooking(
  offerId: string,
  searchId: string,
): Promise<{ checkoutUrl: string; bookingReference: string }> {
  try {
    const response = await apiClient.post<{
      checkoutUrl: string;
      bookingReference: string;
    }>("/travel/flights/book", { offerId, searchId });
    if (!response.data.checkoutUrl || !response.data.bookingReference) {
      throw new Error("The flight service did not return a secure booking session.");
    }
    return response.data;
  } catch (error) {
    throw serviceError(error, "Flight booking");
  }
}
