import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createSlot: builder.mutation({
            query: (slotInfo) => ({
                url: '/slots',
                method: 'POST',
                body: slotInfo,
            }),
            invalidatesTags: ['slot'],
        }),
        getAllSlot: builder.query({
            query: () => ({
                url: '/slots/availability',
                method: 'GET',

            }),
            providesTags: ['slot'],
        }),
        getSlot: builder.query({
            query: (args) => ({
                url: `/slots/availability?date=${args.date}&roomId=${args.roomId}`,
                method: 'GET',

            }),
            providesTags: ['slot'],
        }),
        updateSlot: builder.mutation({
            query: (args) => ({
                url: `/slots/${args.id}`,
                method: 'PUT',
                body: args.updateData

            }),
            invalidatesTags: ['slot'],
        }),
        deleteSlot: builder.mutation({
            query: (id) => ({
                url: `/slots/${id}`,
                method: 'DELETE',


            }),
            invalidatesTags: ['slot'],
        }),
    }),
});

export const { useCreateSlotMutation, useGetAllSlotQuery, useUpdateSlotMutation, useDeleteSlotMutation, useGetSlotQuery } = authApi;
