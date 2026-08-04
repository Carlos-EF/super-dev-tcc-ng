import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environments';

@Service()
export class ClientsService {
    private httpClient = inject(HttpClient);

    private url = `${environment.apiUrl}/clients`;

    getAll() {
        return this.httpClient.get(this.url);
    }
}
