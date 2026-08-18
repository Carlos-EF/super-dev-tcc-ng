import { FinalityTypes } from "../types/finality.types";
import { FurnishedTypes, FurnitureTypes } from "../types/furnished.types";
import { PropertyTypes } from "../types/property.types";
import { ZoningTypes } from "../types/zoning.types";

export interface PropertyResponse {
    id: string;
    proprietario: string | null;
    corretor: string | null;
    codigo: string;
    finalidade: FinalityTypes;
    tipo: PropertyTypes;
    em_condominio: boolean;
    condominio: string | null;
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    uf: string;
    cidade: string;
    complemento: string | null;
    valor: number | null;
    valor_iptu: number | null;
    valor_condominio: number | null;
    criado_em: Date;
    alterado_em: Date;
}

export interface CreatePropertyRequest {
    proprietario: string | null;
    corretor: string | null;
    codigo: string;
    finalidade: FinalityTypes;
    tipo: PropertyTypes;
    em_condominio: boolean;
    condominio: string | null;
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    uf: string;
    cidade: string;
    complemento: string | null;
    valor: number | null;
    valor_iptu: number | null;
    valor_condominio: number | null;
}

export interface EditPropertyRequest {
    proprietario: string | null;
    corretor: string | null;
    finalidade: FinalityTypes;
    tipo: PropertyTypes;
    em_condominio: boolean;
    condominio: string | null;
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    uf: string;
    cidade: string;
    complemento: string | null;
    valor: number | null;
    valor_iptu: number | null;
    valor_condominio: number | null;
}

export interface HouseResponse {
    id: string;
    imovel_id: string;
    metragem: number | null;
    quartos: number | null;
    suites: number | null;
    banheiros: number | null;
    garagens: number | null;
    andares: number | null;
    salas: number | null;
    esta_mobiliado: FurnishedTypes | null;
    mobilia: FurnitureTypes[] | null;
    criado_em: Date;
    alterado_em: Date;
}

export interface CreateHouseRequest {
    imovel_id: string;
    metragem: number | null;
    quartos: number | null;
    suites: number | null;
    banheiros: number | null;
    garagens: number | null;
    andares: number | null;
    salas: number | null;
    esta_mobiliado: FurnishedTypes | null;
    mobilia: FurnitureTypes[] | null;
}

export interface EditHouseRequest {
    metragem: number | null;
    quartos: number | null;
    suites: number | null;
    banheiros: number | null;
    garagens: number | null;
    andares: number | null;
    salas: number | null;
    esta_mobiliado: FurnishedTypes | null;
    mobilia: FurnitureTypes[] | null;
}

export interface ApartmentResponse {
    id: string;
    imovel_id: string;
    metragem: number | null;
    quartos: number | null;
    suites: number | null;
    banheiros: number | null;
    garagens: number | null;
    andares: number | null;
    salas: number | null;
    esta_mobiliado: FurnishedTypes | null;
    mobilia: FurnitureTypes[] | null;
    criado_em: Date;
    alterado_em: Date;
}

export interface CreateApartmentRequest {
    imovel_id: string;
    metragem: number | null;
    quartos: number | null;
    suites: number | null;
    banheiros: number | null;
    garagens: number | null;
    andares: number | null;
    salas: number | null;
    esta_mobiliado: FurnishedTypes | null;
    mobilia: FurnitureTypes[] | null;
}

export interface EditApartmentRequest {
    metragem: number | null;
    quartos: number | null;
    suites: number | null;
    banheiros: number | null;
    garagens: number | null;
    andares: number | null;
    salas: number | null;
    esta_mobiliado: FurnishedTypes | null;
    mobilia: FurnitureTypes[] | null;
}

export interface LandResponse {
    id: string;
    imovel_id: string;
    area_total: number | null;
    medida_esquerda: number | null;
    medida_direita: number | null;
    medida_frente: number | null;
    medida_fundo: number | null;
    zoneamento: ZoningTypes | null;
    coeficiente: number | null;
    criado_em: Date;
    alterado_em: Date;
}

export interface CreateLandRequest {
    imovel_id: string;
    area_total: number | null;
    medida_esquerda: number | null;
    medida_direita: number | null;
    medida_frente: number | null;
    medida_fundo: number | null;
    zoneamento: ZoningTypes | null;
    coeficiente: number | null;
}

export interface EditLandRequest {
    area_total: number | null;
    medida_esquerda: number | null;
    medida_direita: number | null;
    medida_frente: number | null;
    medida_fundo: number | null;
    zoneamento: ZoningTypes | null;
    coeficiente: number | null;
}

export interface PaginatedPropertyResponse {
    imoveis: CompletePropertyResponse[];
    pagina: number;
    por_pagina: number;
    total: number;
    total_paginas: number;
}

export interface HouseData {
    metragem?: number | null;
    quartos?: number | null;
    suites?: number | null;
    banheiros?: number | null;
    garagens?: number | null;
    andares?: number | null;
    salas?: number | null;
    esta_mobiliado?: FurnishedTypes | null;
    mobilia?: FurnitureTypes[] | null;
}

export interface ApartmentData {
    metragem?: number | null;
    quartos?: number | null;
    suites?: number | null;
    banheiros?: number | null;
    garagens?: number | null;
    andares?: number | null;
    salas?: number | null;
    esta_mobiliado?: FurnishedTypes | null;
    mobilia?: FurnitureTypes[] | null;
}

export interface LandData {
    area_total?: number | null;
    medida_esquerda?: number | null;
    medida_direita?: number | null;
    medida_frente?: number | null;
    medida_fundo?: number | null;
    zoneamento?: ZoningTypes | null;
    coeficiente?: number | null;
}

export interface CompletePropertyResponse {
    id: string;
    proprietario: string | null;
    corretor: string | null;
    codigo: string;
    finalidade: FinalityTypes;
    tipo: PropertyTypes;
    em_condominio: boolean;
    condominio: string | null;
    cep: string;
    logradouro: string;
    numero: number;
    bairro: string;
    uf: string;
    cidade: string;
    complemento: string | null;
    valor: number | null;
    valor_iptu: number | null;
    valor_condominio: number | null;
    casa?: HouseData | null;
    apartamento?: ApartmentData | null;
    terreno?: LandData | null;
    criado_em: Date;
    alterado_em: Date;
}