"use server";

import axiosInstance from "@/Utils/axios";
import { NumberApiUrl } from "@/configs/apiUrlConstant";
import {
  ApiResponseType,
  createNumberPymenIntentType,
} from "@/types/apps/apiTypes";

export const createNumberPymenIntent = async (
  data: createNumberPymenIntentType
) => {
  try {
    const res: ApiResponseType = await axiosInstance.post(
      NumberApiUrl.createPaymentIntent,
      data
    );
    if (res.statusCode === 201 && res.status === "success") {
      return { status: "success", data: res.data };
    } else {
      return { status: "error", message: res?.message };
    }
  } catch (error) {
    return { status: "error", message: "Something went wrong" };
  }
};

export const purcaseNumber = async (payment_intent: string) => {
  try {
    const res: ApiResponseType = await axiosInstance.post(
      NumberApiUrl.purchaseNumber,
      { payment_intent }
    );
    if (res.statusCode === 200 && res.status === "success") {
      return { status: "success", data: res.data, message: res?.message };
    } else {
      return { status: "error", message: res?.message };
    }
  } catch (error) {
    return { status: "error", message: "Something went wrong" };
  }
};
