export const CLIENTS_TYPES = [
    'interessado',
    'proprietario',
    'locatario',
] as const;

export type ClientsTypes =
    typeof CLIENTS_TYPES[number];