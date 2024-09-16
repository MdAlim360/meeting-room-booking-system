/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';


import { toast } from 'sonner';
import { RootState } from '../store';
import { logout, setUser } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://meeting-room-booking-system-backend-coral.vercel.app/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401 || result?.error?.status === 500) {
        console.log('Sending refresh token');

        const res = await fetch('https://meeting-room-booking-system-backend-coral.vercel.app/api/auth/refresh-token', {
            method: 'POST',
            credentials: 'include',
        });

        if (res.ok) {
            const data = await res.json();
            console.log('Refresh token response:', data);

            if (data?.data?.accessToken) {
                const user = (api.getState() as RootState).auth.user;

                api.dispatch(
                    setUser({
                        user,
                        token: data.data.accessToken,
                    })
                );
                console.log('Updated state:', (api.getState() as RootState).auth);
                // Retry the original request with the new token
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(logout());
                toast.error("Session expired, please log in again.");
            }
        } else {
            api.dispatch(logout());
            toast.error("Failed to refresh token, please log in again.");
        }
    } else if (result?.error?.status === 403 || result?.error?.status === 404) {
        const errorMessage = (result.error.data as { message?: string })?.message;
        toast.error(errorMessage || "An error occurred.");

    }

    return result;
};


export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ['room', 'slot', 'booking'],
    endpoints: () => ({}),
});
