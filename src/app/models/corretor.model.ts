export interface CorretorResponse {
    id: string;
    status: string;
    nome_completo: string;
    codigo: number;
    celular: string;
    tipo: string
    email: string;
    creci: string;
    data_nascimento: string;
    rg: string;
    cpf: string;
}

export interface CorretorCriarRequest {
    nome_completo: string;
    codigo: number;
    celular: string;
    email: string;
    creci: string;
    data_nascimento: string;
    rg: string;
    cpf: string;
}

export interface CorretorEditarRequest {
    nome_completo: string;
    celular: string;
    email: string;
    data_nascimento: string;
    rg: string;
    cpf: string;
}