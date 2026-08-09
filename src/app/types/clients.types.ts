export const CLIENTS_TYPES = [
    'Interessado',
    'Proprietário',
    'Locatário',
] as const;

export type ClientsTypes =
    typeof CLIENTS_TYPES[number];