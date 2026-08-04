import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environments';
import { ClientsFilters, CreateClientRequest, CreateInterestedRequest, EditClientRequest, EditInterestedRequest, EditInterestedRequest } from '../models/clients.model';

@Service()
export class ClientsService {
    private httpClient = inject(HttpClient);

    private url = `${environment.apiUrl}/clients`;

    getAll(
        filters?: ClientsFilters,
        pagina: number = 1,
        porPagina: number = 10
    ) {
        let params = new HttpParams();

        if (filters?.busca) {
            params = params.set('busca', filters.busca);
        }

        if (filters?.tipo) {
            params = params.set('tipo', filters.tipo);
        }

        if (filters?.origem) {
            params = params.set('origem', filters.origem);
        }

        params = params.set('pagina', pagina);

        params = params.set('por_pagina', porPagina);

        return this.httpClient.get(this.url, { params });
    }

    delete(id: string) {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.delete(urlWithId);
    }

    getById(id: string) {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.get(urlWithId);
    }

    getInterestedById(id: string) {
        const urlWithId = `${this.url}/${id}/interested`;

        return this.httpClient.get(urlWithId);
    }

    create(
        form: CreateClientRequest
    ) {
        return this.httpClient.post(this.url, form);
    }

    createInterested(
        id: string,
        form: CreateInterestedRequest
    ) {
        const urlWithId = `${this.url}/${id}/interested`;

        return this.httpClient.post(urlWithId, form);
    }

    edit(
        id: string,
        form: EditClientRequest
    ) {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.put(urlWithId, form);
    }

    editInterested(
        id: string,
        form: EditInterestedRequest
    ) {
        const urlWithId = `${this.url}/${id}/interested`;

        return this.httpClient.put(urlWithId, form);
    }
}
