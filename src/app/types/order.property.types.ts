export const ORDER_PROPERTY_TYPES = [
    'recente-asc', 
    'preco-asc', 
    'preco-desc', 
    'code'
] as const;

export type OrderPropertyTypes =
    typeof ORDER_PROPERTY_TYPES[number];