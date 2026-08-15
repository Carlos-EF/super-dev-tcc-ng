export const FURNISHED_TYPES = [
    'Sim',
    'Não',
    'Semimobiliado'
] as const

export type FurnishedTypes =
    typeof FURNISHED_TYPES[number]


export const FURNITURE_TYPES = [
    'Cozinha planejada',
    'Armários nos quartos',
    'Armários nos banheiros',
    'Ar-condicionado',
    'Eletrodomésticos',
    'Sofá',
    'Mesa de jantar',
    'Camas',
    'Cortinas e persianas'
] as const

export type FurnitureTypes =
    typeof FURNITURE_TYPES[number]