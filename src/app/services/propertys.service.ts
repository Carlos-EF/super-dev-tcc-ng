import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { PaginatedPropertyResponse } from '../models/property.model';

@Service()
export class PropertysService {
    private httpClient = inject(HttpClient);

    private url = `${environment.apiUrl}/propertys`;

    getAll(
        pagina: number = 1,
        porPagina: number = 10
    ): Observable<PaginatedPropertyResponse> {
        let params = new HttpParams();

        params = params.set('pagina', pagina);

        params = params.set('por_pagina', porPagina);

        return this.httpClient.get<PaginatedPropertyResponse>(
            this.url, {
            params
        });
    }
}
