import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { CondominiumFilters, CondominiumResponse, CreateCondominiumRequest, EditCondominiumRequest } from '../models/condominium.model';

@Service()
export class CondominiumService {
    private httpClient = inject(HttpClient);

    private url = `${environment.apiUrl}/condominiums`;

    getAll(filters?: CondominiumFilters): Observable<CondominiumResponse[]> {
        let params = new HttpParams();
        if (filters?.busca) {
            params = params.set('busca', filters.busca);
        }

        if (filters?.cidade) {
            params = params.set('cidade', filters.cidade);
        }

        if (filters?.bairro) {
            params = params.set('bairro', filters.bairro);
        }

        return this.httpClient.get<CondominiumResponse[]>(
            this.url,
            { params }
        );
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
