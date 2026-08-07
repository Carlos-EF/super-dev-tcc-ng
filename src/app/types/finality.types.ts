export const FINALITY_TYPES = [
    'Venda',
    'Locação',
    null
] as const;

export type FinalityTypes =
    typeof FINALITY_TYPES[number];