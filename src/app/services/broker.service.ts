import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { BrokerFilters, BrokerResponse, CreateBrokerRequest, EditBrokerRequest, PaginatedBrokerResponse } from '../models/broker.model';
import { BrokerTables } from '../types/broker.sort.types';
import { SortType } from '../types/sort.types';

@Service()
export class BrokerService {
    private httpClient = inject(HttpClient);

    private url = `${environment.apiUrl}/brokers`;

    getAll(
        filters?: BrokerFilters,
        pagina: number = 1,
        porPagina: number = 10,
        ordenarPor: BrokerTables = 'nome',
        direcao: SortType = 'asc'
    ): Observable<PaginatedBrokerResponse> {
        let params = new HttpParams()
            .set('pagina', pagina.toString())
            .set('por_pagina', porPagina.toString())
            .set('ordenar_por', ordenarPor)
            .set('direcao', direcao);

        if (filters?.busca) {
            params = params.set('busca', filters.busca);
        }

        return this.httpClient.get<PaginatedBrokerResponse>(
            this.url,
            { params }
        );
    };

    getById(id: string): Observable<BrokerResponse> {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.get<BrokerResponse>(urlWithId);
    };

    Delete(id: string): Observable<void> {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.delete<void>(urlWithId);
    };

    create(form: CreateBrokerRequest): Observable<BrokerResponse> {
        return this.httpClient.post<BrokerResponse>(this.url, form);
    };

    edit(id: string, form: EditBrokerRequest): Observable<BrokerResponse> {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.put<BrokerResponse>(urlWithId, form);
    };
}
