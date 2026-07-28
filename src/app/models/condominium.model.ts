export interface CreateCondominiumRequest {
    nome: string;
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    uf: string;
    cidade: string
}

export interface EditCondominiumRequest {
    nome: string;
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    uf: string;
    cidade: string
}

export interface CondominiumResponse {
    id: string;
    nome: string;
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    uf: string;
    cidade: string;
    criado_em: Date;
    alterado_em: Date;
}

export interface PaginatedCondominiumResponse {
    condominios: CondominiumResponse[];
    pagina: number;
    por_pagina: number;
    total: number;
    total_paginas: number;
}

export interface CondominiumFilters {
    busca?: string;
    cidade?: string;
    bairro?: string;
}

export interface CitiesResponse {
    cidades: string[];
}

export interface DistrictsResponse {
    bairros: string[];
}
