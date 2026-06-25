export interface CriarImovelRequest {
    id_proprietario: string;
    id_corretor: string;
    codigo: string;
    finalidade: string;
    tipo: string;
    em_condominio: boolean;
    condominio: string;
    cep: string;
    logradouro: string;
    numero: number;
    estado: string;
    cidade: string;
    bairro: string;
    complemento: string;
    valor: number;
    valor_condominio: number;
    iptu: number;
    quantidade_quartos: number;
    quantidade_suites: number;
    quantidade_banheiros: number;
    quantidade_vagas: number;
    quantidade_andares: number;
    quantidade_salas: number;
    esta_mobiliado: boolean;
}