export const FINALIDADES = [
    'Venda',
    'Aluguel'
] as const;

export type Finalidade = 
    typeof FINALIDADES[number];