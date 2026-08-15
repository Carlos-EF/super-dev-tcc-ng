import { FinalityTypes } from "../types/finality.types";
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