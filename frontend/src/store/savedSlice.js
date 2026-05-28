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
        },
        upsertSavedCrime: (state, action) => {
            const crimeData = normalizeSavedCrime(action.payload);
            if (crimeData.id === undefined || crimeData.id === null) return;

            const existingIndex = state.savedCrimes.findIndex((crime) => crime.id === crimeData.id);

            if (existingIndex >= 0) {
                state.savedCrimes[existingIndex] = {
                    ...state.savedCrimes[existingIndex],
                    ...crimeData
                };
            } else {
                state.savedCrimes.push(crimeData);
            }

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
            location: payload.location || '',
            type: payload.type || '',
            latitude: payload.latitude ?? payload.lat ?? null,
            longitude: payload.longitude ?? payload.lng ?? null,
            date: payload.date || '',
            severity: payload.severity ?? null,
            source: payload.source || '',
            image_url: payload.image_url || '',
            image_alt: payload.image_alt || ''
        };
    }

    return {
        id: payload,
        title: '',
        description: '',
        location: '',
        type: '',
        latitude: null,
        longitude: null,
        date: '',
        severity: null,
        source: '',
        image_url: '',
        image_alt: ''
    };
}

function persistSavedCrimes(savedCrimes) {
    localStorage.setItem('savedCrimes', JSON.stringify(savedCrimes));
}

export const { toggleSavedCrime, deleteSavedCrime, clearSavedCrimes, upsertSavedCrime } = savedSlice.actions;
export default savedSlice.reducer;