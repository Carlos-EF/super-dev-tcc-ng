export const ESTA_EM_CONDOMINIO = [
    'Sim',
    'Não'
] as const;

export type EstaEmCondominio = 
    typeof ESTA_EM_CONDOMINIO[number];