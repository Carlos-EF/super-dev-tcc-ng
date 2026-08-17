import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environments';
import { ClientResponse, ClientsFilters, CreateClientRequest, CreateInterestedRequest, EditClientRequest, EditInterestedRequest, InterestedResponse, PaginatedClientResponse } from '../models/clients.model';
import { Observable } from 'rxjs';

@Service()
export class ClientsService {
    private httpClient = inject(HttpClient);

    private url = `${environment.apiUrl}/clients`;

    getAll(
        filters?: ClientsFilters,
        pagina: number = 1,
        porPagina: number = 10
    ): Observable<PaginatedClientResponse> {
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

        if (filters?.ordem) {
            params = params.set('ordem', filters.ordem);
        }

        params = params.set('pagina', pagina);

        params = params.set('por_pagina', porPagina);

        return this.httpClient.get<PaginatedClientResponse>(
            this.url, {
            params
        });
    }

    getAllOwners(): Observable<ClientResponse[]> {
        const urlForList = `${this.url}/owners`;

        return this.httpClient.get<ClientResponse[]>(urlForList);
    }

    delete(id: string): Observable<void> {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.delete<void>(urlWithId);
    }

    getById(id: string): Observable<ClientResponse> {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.get<ClientResponse>(urlWithId);
    }

    getInterestedById(id: string): Observable<InterestedResponse> {
        const urlWithId = `${this.url}/${id}/interested`;

        return this.httpClient.get<InterestedResponse>(urlWithId);
    }

    create(
        form: CreateClientRequest
    ): Observable<ClientResponse> {
        return this.httpClient.post<ClientResponse>(this.url, form);
    }

    createInterested(
        id: string,
        form: CreateInterestedRequest
    ): Observable<InterestedResponse> {
        const urlWithId = `${this.url}/${id}/interested`;

        return this.httpClient.post<InterestedResponse>(urlWithId, form);
    }

    edit(
        id: string,
        form: EditClientRequest
    ): Observable<ClientResponse> {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.put<ClientResponse>(urlWithId, form);
    }

    editInterested(
        id: string,
        form: EditInterestedRequest
    ): Observable<InterestedResponse> {
        const urlWithId = `${this.url}/${id}/interested`;

        return this.httpClient.put<InterestedResponse>(urlWithId, form);
    }
}
