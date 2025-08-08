/* eslint-disable @typescript-eslint/no-explicit-any */
// src/redux/api/contactApi.ts
import { baseApi } from "./baseApi";

const subscribeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscribe: builder.mutation({
      query: (body) => ({
        url: "/subscription",
        method: "POST",
        body,
      }),
    }),
    getSubscribe: builder.query({
      query: () => ({
        url: "/subscription",
        method: "GET",
      }),
      providesTags: ["Subscribe"],
    }),
    deleteSubscribe: builder.mutation({
      query: (id) => ({
        url: `/subscription/${id}`,
        method: "DELETE",
      }),
    }),
    sendWelcomeEmail: builder.mutation({
      query: (body) => ({
        url: "/email/success",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscribe"],
    }),
    sendBroadcastEmail: builder.mutation({
      query: (data) => {
        const formData = new FormData();
        formData.append("subject", data.subject);
        formData.append("message", data.message);

        if (data.attachments) {
          Array.from(data.attachments).forEach((file: any) => {
            formData.append("attachments", file);
          });
        }

        return {
          url: "/email/broadcast",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

export const { 
    useCreateSubscribeMutation,
    useGetSubscribeQuery,
    useDeleteSubscribeMutation,
    useSendWelcomeEmailMutation,
    useSendBroadcastEmailMutation,
 } = subscribeApi;
