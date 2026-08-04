import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environments';
import { ClientsFilters } from '../models/clients.model';

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
}
