export const ESTA_MOBILIADO = [
    'Sim',
    'Não'
] as const;

export type EstaMobiliado = 
    typeof ESTA_MOBILIADO[number];