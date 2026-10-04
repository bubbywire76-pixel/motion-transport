import apiClient from "@services/api";
import { serviceError } from "@services/apiErrors";

export interface Biller {
  id: string;
  name: string;
  category: string;
  currency: string;
  countryCode: string;
  requiresCustomerReference: boolean;
}

export interface BillPaymentInput {
  billerId: string;
  countryCode: string;
  customerReference: string;
  amount: number;
}

export interface CheckoutSession {
  checkoutUrl: string;
  reference: string;
}

export async function getBillers(countryCode: string): Promise<Biller[]> {
  try {
    const response = await apiClient.get<{ billers: Biller[] }>("/lifestyle/billers", {
      params: { countryCode: countryCode.toUpperCase() },
    });
    if (!Array.isArray(response.data.billers)) {
      throw new Error("The bill-payment service returned an invalid biller list.");
    }
    return response.data.billers;
  } catch (error) {
    throw serviceError(error, "Bill payment");
  }
}

export async function startBillPayment(
  input: BillPaymentInput,
): Promise<CheckoutSession> {
  try {
    const response = await apiClient.post<CheckoutSession>(
      "/lifestyle/bills/pay",
      input,
    );
    if (!response.data.checkoutUrl || !response.data.reference) {
      throw new Error("The bill-payment service did not return a secure checkout.");
    }
    return response.data;
  } catch (error) {
    throw serviceError(error, "Bill payment");
  }
}
