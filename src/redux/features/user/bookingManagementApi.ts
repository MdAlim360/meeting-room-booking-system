import { baseApi } from "@/redux/api/baseApi";

export const bookingApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (bookingInfo) => ({
                url: '/bookings',
                method: 'POST',
                body: bookingInfo,
            }),
            invalidatesTags: ['booking'],
        }),
        getAllBookings: builder.query({
            query: () => ({
                url: '/bookings',
                method: 'GET',

            }),
            providesTags: ['booking'],
        }),
        getMyBookings: builder.query({
            query: () => ({
                url: "/my-bookings",
                method: 'GET',

            }),
            providesTags: ['booking'],
        }),
        updateBooking: builder.mutation({
            query: ({ id, status }) => ({
                url: `/bookings/${id}`,
                method: 'PUT',
                body: { isConfirmed: status }, // Updating the booking status
            }),
            invalidatesTags: ['booking'],
        }),

        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `/bookings/${id}`,
                method: 'DELETE',


            }),
            invalidatesTags: ['booking'],
        }),
    }),
});

export const { useCreateBookingMutation, useGetAllBookingsQuery, useUpdateBookingMutation, useDeleteBookingMutation, useGetMyBookingsQuery } = bookingApi;
