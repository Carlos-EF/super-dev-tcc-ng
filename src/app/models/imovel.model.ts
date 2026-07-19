export interface CriarImovelRequest {
    proprietario: string | null;
    corretor: string | null;
    codigo: string;
    finalidade: string;
    tipo: string;
    em_condominio: boolean;
    condominio: string | null;
    cep: string;
    logradouro: string;
    numero: number;
    estado: string;
    cidade: string;
    bairro: string;
    complemento: string | null;
    valor: number;
    valor_condominio: number | null;
    valor_iptu: number;
    quantidade_quartos: number;
    quantidade_suites: number;
    quantidade_banheiros: number;
    quantidade_vagas: number;
    quantidade_andares: number;
    quantidade_salas: number;
    eh_mobiliado: boolean;
}

export interface EditarImovelRequest {
    proprietario: string | null;
    corretor: string | null;
    finalidade: string;
    tipo: string;
    em_condominio: boolean;
    condominio: string | null;
    cep: string;
    logradouro: string;
    numero: number;
    estado: string;
    cidade: string;
    bairro: string;
    complemento: string | null;
    valor: number;
    valor_condominio: number;
    valor_iptu: number;
    quantidade_quartos: number;
    quantidade_suites: number;
    quantidade_banheiros: number;
    quantidade_vagas: number;
    quantidade_andares: number;
    quantidade_salas: number;
    eh_mobiliado: boolean;
}

export interface ImovelResponse {
    id: string;
    status: string;
    codigo: string;
    proprietario: string | null;
    corretor: string | null;
    finalidade: string;
    tipo: string;
    em_condominio: boolean;
    condominio: string | null;
    cep: string;
    logradouro: string;
    numero: number;
    estado: string;
    cidade: string;
    bairro: string;
    complemento: string | null;
    valor: number;
    valor_condominio: number;
    valor_iptu: number;
    quantidade_quartos: number;
    quantidade_suites: number;
    quantidade_banheiros: number;
    quantidade_vagas: number;
    quantidade_andares: number;
    quantidade_salas: number;
    eh_mobiliado: boolean;
}

export interface ImagensImovelResponse {
    id: string;
    id_imovel: string;
    imagem: string | null;
    imagem_principal: boolean;
}