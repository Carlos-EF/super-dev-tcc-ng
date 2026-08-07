export const CLIENTS_TYPES = [
    'Interessado',
    'Proprietário',
    'Locatario',
] as const;

export type ClientsTypes =
    typeof CLIENTS_TYPES[number];