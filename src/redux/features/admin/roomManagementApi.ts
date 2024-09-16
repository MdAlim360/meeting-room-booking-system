import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createRoom: builder.mutation({
            query: (roomInfo) => ({
                url: '/rooms',
                method: 'POST',
                body: roomInfo,
            }),
            invalidatesTags: ['room'],
        }),
        getAllRooms: builder.query({
            query: () => ({
                url: '/rooms/',
                method: 'GET',

            }),
            providesTags: ['room'],
        }),
        getSingleRooms: builder.query({
            query: (id) => ({
                url: `/rooms/${id}`,
                method: 'GET',

            }),
            providesTags: ['room'],
        }),
        updateRoom: builder.mutation({
            query: (args) => ({
                url: `/rooms/${args.id}`,
                method: 'PUT',
                body: args.updateData

            }),
            invalidatesTags: ['room'],
        }),
        deleteRoom: builder.mutation({
            query: (id) => ({
                url: `/rooms/${id}`,
                method: 'DELETE',


            }),
            invalidatesTags: ['room'],
        }),
    }),
});

export const { useCreateRoomMutation, useGetAllRoomsQuery, useUpdateRoomMutation, useDeleteRoomMutation, useGetSingleRoomsQuery } = authApi;
