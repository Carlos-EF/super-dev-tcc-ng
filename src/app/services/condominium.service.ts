import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { CitiesResponse, CondominiumFilters, CondominiumResponse, CreateCondominiumRequest, DistrictsResponse, EditCondominiumRequest, PaginatedCondominiumResponse } from '../models/condominium.model';
import { CondTables } from '../types/cond.sort.types';
import { SortType } from '../types/sort.types';

@Service()
export class CondominiumService {
    private httpClient = inject(HttpClient);

    private url = `${environment.apiUrl}/condominiums`;

    getAll(
        filters?: CondominiumFilters,
        pagina: number = 1,
        porPagina: number = 10,
        ordenarPor: CondTables = 'nome',
        direcao: SortType = 'asc'
    ): Observable<PaginatedCondominiumResponse> {
        let params = new HttpParams()
        .set('pagina', pagina.toString())
        .set('por_pagina',porPagina.toString())
        .set('ordenar_por', ordenarPor)
        .set('direcao', direcao);
        
        if (filters?.busca) {
            params = params.set('busca', filters.busca);
        }

        if (filters?.cidade) {
            params = params.set('cidade', filters.cidade);
        }

        if (filters?.bairro) {
            params = params.set('bairro', filters.bairro);
        }

        return this.httpClient.get<PaginatedCondominiumResponse>(
            this.url,
            { params }
        );
    };

    getAllCities(): Observable<CitiesResponse> {
        const citiesUrl = `${this.url}/cities`;

        return this.httpClient.get<CitiesResponse>(citiesUrl);
    }

    getAllDistricts(): Observable<DistrictsResponse> {
        const districts = `${this.url}/districts`;

        return this.httpClient.get<DistrictsResponse>(districts);
    }

    getById(id: string): Observable<CondominiumResponse> {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.get<CondominiumResponse>(urlWithId);
    };

    delete(id: string): Observable<void> {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.delete<void>(urlWithId);
    };

    create(form: CreateCondominiumRequest): Observable<CondominiumResponse> {
        return this.httpClient.post<CondominiumResponse>(this.url, form);
    };

    edit(id: string, form: EditCondominiumRequest): Observable<CondominiumResponse> {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.put<CondominiumResponse>(urlWithId, form);
    };
}
