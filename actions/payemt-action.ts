"use server";
import stripe, { Stripe } from "stripe";
import axiosInstance from "@/Utils/axios";
import { PaymentApiUrl } from "@/configs/apiUrlConstant";
import { ApiResponseType } from "@/types/apps/apiTypes";
import { currentUser } from "@/lib/auth";
import { compose } from "@reduxjs/toolkit";
const STRIPE_SECRET_KEY =
  "sk_test_51OueQMSGgnhibNHxfl02rIjRenpI2YcqQFyuryCvSSMqpc5cmLEEZoBzQFD0flJq1jD6HMlJcMCXuQ5JKMvxAhOX009FHFg0Ih"; // export async function createPaymentIntent(
export const createPaymentIntent = async (
  amount: number,
  metaData: any = {}
) => {
  try {
    const user = await currentUser();
    const stripeInstance: Stripe = new stripe(STRIPE_SECRET_KEY);
    const paymentIntent = await stripeInstance.paymentIntents.create({
      currency: "USD",
      amount: amount,
      automatic_payment_methods: { enabled: true },
      description: "Number paarches payment",
      shipping: {
        name: `${user?.firstName} ${user?.lastName}`,
        address: {
          line1: "510 Townsend St",
          postal_code: "98140",
          city: "San Francisco",
          state: "CA",
          country: "US",
        },
      },
      metadata: metaData,
    });
    return { status: "success", data: paymentIntent.client_secret };
  } catch (error: any) {
    return { status: "error", data: error?.message || "somthing went worng" };
  }
};
