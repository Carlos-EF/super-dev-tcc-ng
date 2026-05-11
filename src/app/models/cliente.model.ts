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