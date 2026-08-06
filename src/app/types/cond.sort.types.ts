export const COND_TABLES = [
    'nome',
    'endereco',
    'imoveis',
] as const;

export type CondTables =
    typeof COND_TABLES[number];