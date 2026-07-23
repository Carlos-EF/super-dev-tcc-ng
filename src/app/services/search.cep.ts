import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class SearchCep {
    private httpClient = inject(HttpClient);

    private searchCepUrl = 'https://brasilapi.com.br/api/cep/v1/';

    get(cep: string) {}
}
