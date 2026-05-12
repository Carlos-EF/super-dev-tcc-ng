export const TIPOS_CLIENTE = [
    'Interessado',
    'Locatário',
    'Proprietário'
] as const;

export type TipoCliente =
    typeof TIPOS_CLIENTE[number];