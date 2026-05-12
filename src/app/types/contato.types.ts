export const TIPOS_CONTATO = [
     'Whatsapp',
     'Anúncio',
     'Contato Direto',
     'Instagram'
] as const;


export type TipoContato = 
    typeof TIPOS_CONTATO[number];