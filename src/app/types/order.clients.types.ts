export const ORDER_CLIENTS_TYPES = [
    'nome-asc', 
    'nome-desc', 
    'code'
] as const;

export type OrderClientsTypes =
    typeof ORDER_CLIENTS_TYPES[number];