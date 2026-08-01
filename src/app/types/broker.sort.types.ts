export const BROKER_TABLES = [
    'nome',
    'imoveis',
    null
] as const;

export type BrokerTables =
    typeof BROKER_TABLES[number];