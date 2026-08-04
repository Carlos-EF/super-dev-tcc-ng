export const PROPERTY_TYPES = [
    'casa',
    'apartamento',
    'terreno',
] as const;

export type PropertyTypes =
    typeof PROPERTY_TYPES[number];