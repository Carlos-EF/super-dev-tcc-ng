import { ClientsTypes } from "../types/clients.types";
import { ContactTypes } from "../types/contact.types";
import { FinalityTypes } from "../types/finality.types";
import { PropertyTypes } from "../types/property.types";

export interface CreateClientRequest {
    nome: string;
    codigo: string;
    numero: string;
    email: string;
    tipo: ClientsTypes;
    como_encontrou: ContactTypes | null;
}

export interface EditClientRequest {
    nome: string;
    numero: string;
    email: string;
    como_encontrou: ContactTypes | null;
}

export interface ClientResponse {
    id: string;
    nome: string;
    codigo: string;
    numero: string;
    email: string;
    tipo: ClientsTypes;
    como_encontrou: ContactTypes | null;
}

export interface CreateInterestRequest {
    cliente_id: string;
    procura: PropertyTypes | null;
    finalidade: FinalityTypes | null;
    preferencia: string | null;
}

export interface EditInterestRequest {
    procura: PropertyTypes | null;
    finalidade: FinalityTypes | null;
    preferencia: string | null;
}

export interface InterestResponse {
    id: string;
    cliente_id: string;
    procura: PropertyTypes | null;
    finalidade: FinalityTypes | null;
    preferencia: string | null;
}

export interface PaginatedClientResponse {
    clientes: ClientResponse[];
    pagina: number;
    por_pagina: number;
    total: number;
    total_paginas: number;
}

export interface ClientsFilters {
    busca?: string;
    tipo?: ClientsTypes;
    origem?: ContactTypes;
}