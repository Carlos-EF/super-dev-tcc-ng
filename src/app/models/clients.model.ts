import { ClientsTypes } from "../types/clients.types";
import { ContactTypes } from "../types/contact.types";

export interface CreateClientRequest {
    nome: string;
    numero: string;
    email: string;
    tipo: ClientsTypes;
    como_encontrou: ContactTypes;
}