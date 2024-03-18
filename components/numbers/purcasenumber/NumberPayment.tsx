import React, { Suspense, useEffect, useState } from "react";
import { CardElement, Elements, PaymentElement } from "@stripe/react-stripe-js";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Alert,
  Box,
  Button,
  CardContent,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { createPaymentIntent } from "@/actions/payemt-action";
import CustomTextField from "@/@core/components/mui/text-field";
import { createNumberPymenIntent } from "@/actions/number-action";
import toast from "react-hot-toast";
import { PATH_DASHBOARD } from "@/routes/paths";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const response: any = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: window.origin+PATH_DASHBOARD.payment.complition,
      },
    });

    console.debug("error", response?.error);
    if (
      response?.error.type === "card_error" ||
      response?.error.type === "validation_error"
    ) {
      setMessage(response?.error?.message || "");
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button
        variant="contained"
        disabled={isProcessing || !stripe || !elements}
        id="submit"
        type="submit"
        sx={{ margin: "15px 0" }}
      >
        {isProcessing ? "Processing ... " : "Pay now"}
      </Button>

      {/* Show any error or success messages */}
      {message && (
        <Alert variant="outlined" severity="error" sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}
    </form>
  );
}

type PropsType = {
  selectedNumber: any;
  assignUser: string[];
  handleBack:()=>void;
};
const NumberPayment = (props: PropsType) => {
  const { selectedNumber, assignUser ,handleBack} = props;
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");
  const theme = useTheme();
  const createPaymentIntentHandle = async () => {
    // const res = await createPaymentIntent(2, {
    //   phoneNumber: selectedNumber?.phoneNumber,
    // });
    const res = await createNumberPymenIntent({
      assignUser: assignUser,
      phoneNumber: selectedNumber?.phoneNumber,
    });
    if (res?.status === "success") {
      console.debug("res", res?.data);
      setClientSecret(res?.data);
    } else {
      toast.error(res?.message || "");
    }
  };

  useEffect(() => {
    setStripePromise(loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`));
    console.debug(
      "`${process.env.STRIPE_PUBLIC_KEY}`",
      `${process.env.STRIPE_PUBLIC_KEY}`
    );
    createPaymentIntentHandle();
  }, []);

  const appearance: Appearance = {
    theme: theme.palette.mode === "light" ? "stripe" : "night",
    variables: {
      colorPrimary: `${theme.palette.primary}`,
      colorBackground: `${theme.palette.background.paper}`,
      colorText: `${theme.palette.text.primary}`,
      colorDanger: "#df1b41",
      fontFamily: "Ideal Sans, system-ui, sans-serif",
      spacingUnit: "5px",
      borderRadius: "4px",
      // See all possible variables below
    },
    rules: {
      ".Tab": {
        border: `1px solid ${theme.palette.primary}`,
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)",
      },

      ".Tab:hover": {
        color: "var(--colorText)",
      },

      ".Tab--selected": {
        borderColor: `${theme.palette.primary}`,
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)",
      },

      ".Input--invalid": {
        boxShadow:
          "0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)",
      },

      // See all supported class names and selector syntax below
    },
  };
  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        md={8}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          // height: "100%",
        }}
      >
        <Box
          sx={{
            ml: 4,
            borderRadius: 1,
            height: "100%",
            border: (theme) => `1px solid ${theme.palette.divider}`,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            "& #payment-form": {
              width: "65%",
            },
          }}
        >
          {clientSecret && stripePromise && (
            <Elements
              stripe={stripePromise}
              options={{ clientSecret, appearance }}
            >
              <CheckoutForm />
            </Elements>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            mb: 4,
            borderRadius: 1,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            height: "100%",
          }}
        >
          <CardContent>
            <Typography sx={{ mb: 4 }} variant="h6">
              Offer
            </Typography>
            <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
              <CustomTextField
                fullWidth
                sx={{ mr: 4 }}
                placeholder="Enter Promo Code"
              />
              <Button variant="tonal">Apply</Button>
            </Box>
            <Box
              sx={{
                p: 5,
                display: "flex",
                borderRadius: 1,
                flexDirection: "column",
                backgroundColor: "action.selected",
              }}
            >
              <Typography sx={{ mb: 2 }} variant="h6">
                Selected Numbers
              </Typography>
              <Typography sx={{ mb: 2, color: "text.secondary" }}>
                {selectedNumber?.friendlyName}
              </Typography>
            </Box>
          </CardContent>
          <Divider sx={{ my: "0 !important" }} />
          <CardContent>
            <Typography sx={{ mb: 4 }} variant="h6">
              Price Details
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Bag Total</Typography>
                <Typography sx={{ color: "text.secondary" }}>$1.00</Typography>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Coupon Discount</Typography>
              </Box>
              <Box
                sx={{
                  mb: 2,
                  gap: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography>Order Total</Typography>
                <Typography sx={{ color: "text.secondary" }}>$1.00</Typography>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              ></Box>
            </Box>
          </CardContent>
          <Divider sx={{ my: "0 !important" }} />
          <CardContent
            sx={{ py: (theme) => `${theme.spacing(3.5)} !important` }}
          >
            <Box
              sx={{
                gap: 2,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontWeight: 500 }}>Total</Typography>
              <Typography sx={{ fontWeight: 500 }}>$1.00</Typography>
            </Box>
          </CardContent>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between",ml:3 }}
      >
        <Button variant="tonal" color="secondary" onClick={handleBack}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
};

export default NumberPayment;
