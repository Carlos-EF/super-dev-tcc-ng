export interface ClienteResponse {
    id: string;
    status: string;
    nome_completo: string;
    codigo: number;
    celular: string;
    email: string;
    tipo: string;
    dados_adicionais: ClienteInteressadoResponse | ClienteProprietarioResponse | ClienteLocatarioResponse;
}

export interface ClienteCriarRequest {
    nome_completo: string;
    codigo: number;
    celular: string;
    email: string;
    tipo: string;
    dados_adicionais: CriarClienteInteressadoRequest | CriarClienteProprietarioRequest | CriarClienteLocatarioRequest;
}

export interface ClienteEditarRequest {
    nome_completo: string;
    celular: string;
    email: string;
    tipo: string;
    dados_adicionais: EditarClienteInteressadoRequest | EditarClienteProprietarioRequest | EditarClienteLocatarioRequest;
}

export interface ClienteInteressadoResponse {
    procurando: string;
    orcamento: number;
    orcamento_minimo: number;
    orcamento_maximo: number;
    quantidade_quartos: number;
    quantidade_suites: number;
    quantidade_banheiros: number;
    quantidade_vagas_garagem: number;
    quantidade_andares: number;
    quantidade_salas: number;
}

export interface EditarClienteInteressadoRequest {
    procurando: string;
    orcamento: number;
    orcamento_minimo: number;
    orcamento_maximo: number;
    quantidade_quartos: number;
    quantidade_suites: number;
    quantidade_banheiros: number;
    quantidade_vagas_garagem: number;
    quantidade_andares: number;
    quantidade_salas: number;
}

export interface CriarClienteInteressadoRequest {
    procurando: string;
    orcamento: number;
    orcamento_minimo: number;
    orcamento_maximo: number;
    quantidade_quartos: number;
    quantidade_suites: number;
    quantidade_banheiros: number;
    quantidade_vagas_garagem: number;
    quantidade_andares: number;
    quantidade_salas: number;
}