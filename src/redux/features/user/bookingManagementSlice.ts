/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

const initialState: any = {
    date: null,
    room: null,
    slots: null,
    user: null,
};

const authSlice = createSlice({
    name: 'bookingData',
    initialState,
    reducers: {
        setBookingData: (state, action) => {
            const { date, room, slots, user } = action.payload;
            state.date = date;
            state.room = room;
            state.slots = slots;
            state.user = user;
        },
    },
});

export const { setBookingData } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
