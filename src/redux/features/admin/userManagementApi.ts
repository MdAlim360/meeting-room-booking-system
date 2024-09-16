import { baseApi } from '../../api/baseApi';

const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({

        getAllUsers: builder.query({
            query: () => ({
                url: '/auth/users/',
                method: 'GET',

            }),
            providesTags: ['user'],
        }),
        updateUser: builder.mutation({
            query: (args) => ({
                url: `/auth/users/${args.id}`,
                method: 'PUT',
                body: args.updateData

            }),
            invalidatesTags: ['user'],
        }),

    }),
});

export const { useGetAllUsersQuery, useUpdateUserMutation } = authApi;
