export const COND_TABLES = [
    'nome',
    'endereco',
] as const;

export type CondTables =
    typeof COND_TABLES[number];