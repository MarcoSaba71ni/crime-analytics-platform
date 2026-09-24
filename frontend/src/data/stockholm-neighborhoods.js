// Stockholm stadsdelsområden (official municipal districts) used by BRÅ crime statistics.
// This is the canonical source of truth for home_neighborhood values across the platform.
// Do not allow free-text input — values must come from this list so they can be
// matched against crime-data zone identifiers when the backend is wired up.

export const STOCKHOLM_NEIGHBORHOODS = [
    'Bromma',
    'Enskede-Årsta-Vantör',
    'Farsta',
    'Gamla Stan',
    'Hägersten-Liljeholmen',
    'Hässelby-Vällingby',
    'Kungsholmen',
    'Norrmalm',
    'Rinkeby-Kista',
    'Skarpnäck',
    'Skärholmen',
    'Spånga-Tensta',
    'Södermalm',
    'Vasastan',
    'Östermalm',
];
