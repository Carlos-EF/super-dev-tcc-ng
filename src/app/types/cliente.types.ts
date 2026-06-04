export const TIPOS_CLIENTE = [
    'Interessado',
    'Locatário',
    'Proprietário'
] as const;

export type TipoCliente =
    typeof TIPOS_CLIENTE[number];


export const TIPO_CLIENTE_MODAL = [
    'Locatário',
    'Proprietário'
] as const;

export type TipoClienteModal =
    typeof TIPO_CLIENTE_MODAL[number];