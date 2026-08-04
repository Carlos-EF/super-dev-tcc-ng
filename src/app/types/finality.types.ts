export const FINALITY_TYPES = [
    'venda',
    'locacao',
    null
] as const;

export type FinalityTypes =
    typeof FINALITY_TYPES[number];