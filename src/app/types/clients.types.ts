export const CLIENTS_TYPES = [
    'interessado',
    'proprietario',
    'locatario',
    null
] as const;

export type ClientsTypes =
    typeof CLIENTS_TYPES[number];