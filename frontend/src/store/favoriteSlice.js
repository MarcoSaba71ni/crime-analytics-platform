import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    favorites: []
};

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const crimeId = action.payload;

            const existingCrime = state.favorites.find(crime => crime.id === crimeId);

            if (existingCrime) {
                state.favorites = state.favorites.filter(crime => crime.id !== crimeId);
            } else {
                state.favorites.push({ id: crimeId });
            }
        },

        clearFavorites: (state) => {
            state.favorites = [];
        }
    }
});

export const { toggleFavorite, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;