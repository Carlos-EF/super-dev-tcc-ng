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
    }
}
