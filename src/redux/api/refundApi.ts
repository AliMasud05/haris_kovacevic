import { baseApi } from "./baseApi";

const refundApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRefundRequest: builder.mutation({
      query: (data) => ({
        url: "/refund-request",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["RefundRequest"],
    }),
    getAllRefundRequests: builder.query({
      query: () => ({
        url: "/refund-request",
        method: "GET",
      }),
      providesTags: ["RefundRequest"],
    }),
    getRefundRequestById: builder.query({
      query: (id) => ({
        url: `/refund-request/${id}`,
        method: "GET",
      }),
      providesTags: ["RefundRequest"],
    }),
    deleteRefundRequest: builder.mutation({
      query: (id) => ({
        url: `/refund-request/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RefundRequest"],
    }),
    
  }),
});

export const {
    useCreateRefundRequestMutation,
    useGetAllRefundRequestsQuery,
    useGetRefundRequestByIdQuery,
    useDeleteRefundRequestMutation,
    

} = refundApi;
