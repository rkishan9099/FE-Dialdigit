import { purcaseNumber } from "@/actions/number-action";
import PaymentComplition from "@/components/payment/PaymentComplition";
import { PATH_DASHBOARD } from "@/routes/paths";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const PaymentComplitionPage = async (params: any) => {
  const payment_intent = params?.searchParams?.payment_intent;
  if (payment_intent) {
    const res = await purcaseNumber(payment_intent);
    return <PaymentComplition data={res?.data} />;
  }
};

export default PaymentComplitionPage;
