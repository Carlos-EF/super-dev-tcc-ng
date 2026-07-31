export interface CreateBrokerRequest {
    nome: string;
    codigo: string;
    creci: string;
    numero: string;
    email: string;
    data_nascimento: string | null;
    rg: string | null;
    cpf: string | null
}

export interface EditBrokerRequest {
    nome: string;
    creci: string;
    numero: string;
    email: string;
    data_nascimento: string | null;
    rg: string | null;
    cpf: string | null
}

export interface BrokerResponse {
    id: string;
    nome: string;
    codigo: string;
    creci: string;
    numero: string;
    email: string;
    data_nascimento: string | null;
    rg: string | null;
    cpf: string | null
    criado_em: Date;
    alterado_em: Date;
}

export interface PaginatedBrokerResponse {
    condominios: BrokerResponse[];
    pagina: number;
    por_pagina: number;
    total: number;
    total_paginas: number;
}
