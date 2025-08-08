import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    stripePayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/stripe",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    stripeResourcePayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/resource-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    cashPayment: builder.mutation({
      query: (data) => ({
        url: "/cash",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    createPaypalPayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/paypal",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),
    createPaypalResourcePayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/paypal/resource-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    //free course payment
    freeCoursePayment: builder.mutation({
      query: (data) => ({
        url: "/stripe-payments/free-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const {  useStripePaymentMutation, useCashPaymentMutation, useStripeResourcePaymentMutation, useCreatePaypalPaymentMutation,
     useCreatePaypalResourcePaymentMutation, useFreeCoursePaymentMutation
 } = paymentApi;
export default paymentApi;
