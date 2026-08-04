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
    como_encontrou: ContactTypes;
}

export interface CreateInterestRequest {
    cliente_id: string;
    procura: PropertyTypes;
    finalidade: FinalityTypes;
    preferencia: string;
}