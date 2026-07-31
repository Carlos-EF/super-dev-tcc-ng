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