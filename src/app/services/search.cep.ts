import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';

@Service()
export class SearchCep {
    private httpClient = inject(HttpClient);

    get(cep: string) {}
}
