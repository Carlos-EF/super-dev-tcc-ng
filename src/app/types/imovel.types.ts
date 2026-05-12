export const TIPOS_IMOVEL = [
    'Apartamento',
    'Casa',
    'Terreno'
] as const;

export type TipoImovel = 
    typeof TIPOS_IMOVEL[number];