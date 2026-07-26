import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { CondominiumResponse, CreateCondominiumRequest } from '../models/condominium.model';

@Service()
export class CondominiumService {
    private httpClient = inject(HttpClient);

    private url = `${environment.apiUrl}/condominium`;

    getAll(): Observable<CondominiumResponse[]> {
        return this.httpClient.get<CondominiumResponse[]>(this.url);
    };

    getById(id: string): Observable<CondominiumResponse> {
        const urlWithId = `${this.url}/${id}`;

        return this.httpClient.get<CondominiumResponse>(urlWithId);
    };

    create(form: CreateCondominiumRequest): Observable<CondominiumResponse> {
        return this.httpClient.post<CondominiumResponse>(this.url, form);
    };
}
