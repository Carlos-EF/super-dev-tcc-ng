export interface CorretorResponse {
    id: string;
    status: string;
    nome_completo: string;
    codigo: string;
    celular: string;
    email: string;
    creci: string;
    data_nascimento: string;
    rg: string;
    cpf: string;
}

export interface CorretorCriarRequest {
    nome_completo: string;
    codigo: string;
    celular: string;
    email: string;
    creci: string;
    data_nascimento: string;
    rg: string;
    cpf: string;
}