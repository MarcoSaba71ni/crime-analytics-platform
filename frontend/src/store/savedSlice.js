import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    savedCrimes: loadSavedCrimes()
};

const savedSlice = createSlice({
    name: 'saved',
    initialState,
    reducers: {
        toggleSavedCrime: (state, action) => {
            const crimeData = normalizeSavedCrime(action.payload);
            if (crimeData.id === undefined || crimeData.id === null) return;

            const existingCrime = state.savedCrimes.find((crime) => crime.id === crimeData.id);

            if (existingCrime) {
                state.savedCrimes = state.savedCrimes.filter((crime) => crime.id !== crimeData.id);
            } else {
                state.savedCrimes.push(crimeData);
            }
            persistSavedCrimes(state.savedCrimes);
        },
        deleteSavedCrime: (state, action) => {
            const crimeId = getCrimeId(action.payload);
            const existingCrime = state.savedCrimes.find((crime) => crime.id === crimeId);
            if (!existingCrime) return;
            else {
                state.savedCrimes = state.savedCrimes.filter(
                    (crime) => crime.id !== crimeId
                );
                persistSavedCrimes(state.savedCrimes);
            }
        },

        clearSavedCrimes: (state) => {
            state.savedCrimes = [];
            persistSavedCrimes(state.savedCrimes);
        }
    }
});

function loadSavedCrimes () {
    try {
        const savedCrimes = localStorage.getItem('savedCrimes');
        if (!savedCrimes) return [];
        const parsed = JSON.parse(savedCrimes);
        if (!Array.isArray(parsed)) return [];

        return parsed
            .map((crime) => normalizeSavedCrime(crime))
            .filter((crime) => crime.id !== undefined && crime.id !== null);
    } catch (error) {
        console.error('Failed to parse saved crimes from localStorage:', error);
        return [];
    }
}

function getCrimeId(payload) {
    return typeof payload === 'object' && payload !== null ? payload.id : payload;
}

function normalizeSavedCrime(payload) {
    if (typeof payload === 'object' && payload !== null) {
        return {
            id: payload.id,
            title: payload.title || '',
            description: payload.description || '',
            location: payload.location || ''
        };
    }

    return {
        id: payload,
        title: '',
        description: '',
        location: ''
    };
}

function persistSavedCrimes(savedCrimes) {
    localStorage.setItem('savedCrimes', JSON.stringify(savedCrimes));
}

export const { toggleSavedCrime, deleteSavedCrime, clearSavedCrimes } = savedSlice.actions;
export default savedSlice.reducer;