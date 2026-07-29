export const COND_TABLES = [
    'nome',
    'endereco',
    'imoveis',
    null
] as const;

export type CondTables =
    typeof COND_TABLES[number];