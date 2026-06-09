import { ConsultaCepResponse } from '@/models/consulta.cep.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private httpClient = inject(HttpClient);

  private environment = environment;

  get(cep: string): Observable<ConsultaCepResponse> {
    const buscarCepUrl = `${this.environment.apiViaCepUrl}/${cep}/json/`;

    return this.httpClient.get<ConsultaCepResponse>(buscarCepUrl);
  }
}
