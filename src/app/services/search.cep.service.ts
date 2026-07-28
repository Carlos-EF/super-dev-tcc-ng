import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';
import { CepResponse } from '../models/cep.model';

@Service()
export class SearchCepService {
    private httpClient = inject(HttpClient);

    private url = `${environment.apiUrl}/ceps`;

    get(cep: string): Observable<CepResponse> {
        const search = `${this.url}/${cep}`;

        return this.httpClient.get<CepResponse>(search);
    }
}
