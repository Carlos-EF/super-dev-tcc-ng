export const CLIENTS_TYPES = [
    'Interessado',
    'Proprietário',
    'Locatario',
    null
] as const;

export type ClientsTypes =
    typeof CLIENTS_TYPES[number];