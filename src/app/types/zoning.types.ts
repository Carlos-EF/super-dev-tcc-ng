export const ZONING_TYPES = [
    'Residencial',
    'Comercial',
    'Industrial',
    'Misto',
    'Rural'
] as const;

export type ZoningTypes =
    typeof ZONING_TYPES[number];