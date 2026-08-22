export const FINALITY_TYPES = [
    'Venda',
    'Locação',
] as const;

export type FinalityTypes =
    typeof FINALITY_TYPES[number];