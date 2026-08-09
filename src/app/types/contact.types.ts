export const CONTACT_TYPES = [
    'WhatsApp',
    'Instagram',
    'Indicação',
    'Portal imobiliário',
    'Placa no imóvel',
] as const;

export type ContactTypes =
    typeof CONTACT_TYPES[number];