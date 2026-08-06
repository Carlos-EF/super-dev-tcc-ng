export const BROKER_TABLES = [
    'nome',
    'imoveis',
] as const;

export type BrokerTables =
    typeof BROKER_TABLES[number];