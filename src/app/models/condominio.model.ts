export interface CriarCondominioRequest {
    nome: string;
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    estado: string;
    cidade: string;
};

export interface EditarCondominioResquest {
    nome: string;
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    estado: string;
    cidade: string;
}

export interface CondominioResponse {
    id: string;
    nome: string;
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    estado: string;
    cidade: string;
}