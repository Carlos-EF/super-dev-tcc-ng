export const CONTACT_TYPES = [
    'WhatsApp',
    'Instagram',
    'Indicação',
    'Portal Imobiliário',
    'Placa no imóvel',
    null
] as const;

export type ContactTypes =
    typeof CONTACT_TYPES[number];