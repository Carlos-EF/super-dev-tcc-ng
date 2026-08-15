import { FinalityTypes } from "../types/finality.types";
import { FurnishedTypes, FurnitureTypes } from "../types/furnished.types";
import { PropertyTypes } from "../types/property.types";

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
    mobilia: [FurnitureTypes] | null;
    criado_em: Date;
    alterado_em: Date;
}

export interface CreateHouseResquest {
    imovel_id: string;
    metragem: number | null;
    quartos: number | null;
    suites: number | null;
    banheiros: number | null;
    garagens: number | null;
    andares: number | null;
    salas: number | null;
    esta_mobiliado: FurnishedTypes | null;
    mobilia: [FurnitureTypes] | null;

}
export interface EditHouseResquest {
    metragem: number | null;
    quartos: number | null;
    suites: number | null;
    banheiros: number | null;
    garagens: number | null;
    andares: number | null;
    salas: number | null;
    esta_mobiliado: FurnishedTypes | null;
    mobilia: [FurnitureTypes] | null;
}