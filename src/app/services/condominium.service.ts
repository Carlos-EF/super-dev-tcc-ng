import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { CondominiumResponse, CreateCondominiumRequest, EditCondominiumRequest } from '../models/condominium.model';

@Service()
export class CondominiumService {
    private httpClient = inject(HttpClient);

    private url = `${environment.apiUrl}/condominiums`;

    getAll(): Observable<CondominiumResponse[]> {
        return this.httpClient.get<CondominiumResponse[]>(this.url);
    };

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
