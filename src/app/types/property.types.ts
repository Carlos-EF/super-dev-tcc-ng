export const PROPERTY_TYPES = [
    'Casa',
    'Apartamento',
    'Terreno',
] as const;

export type PropertyTypes =
    typeof PROPERTY_TYPES[number];