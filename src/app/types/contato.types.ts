export const TIPOS_CONTATO = [
     'WhatsApp',
     'Anúncio',
     'Contato Direto',
     'Instagram'
] as const;


export type TipoContato = 
    typeof TIPOS_CONTATO[number];