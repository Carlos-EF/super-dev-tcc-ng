import { ClienteResponse, CriarClienteRequest, CriarDadosAdicionais, DadosAdicionais, EditarClienteRequest } from '@/models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
    private httpClient = inject(HttpClient);

    getAll(): Observable<ClienteResponse[]> {
      const url = `${environment.apiUrl}/clientes`;

      return this.httpClient.get<ClienteResponse[]>(url);
    }

    create(form: CriarClienteRequest, dadosAdicionais: CriarDadosAdicionais): Observable<ClienteResponse> {
      const url = `${environment.apiUrl}/clientes`;

      return this.httpClient.post<ClienteResponse>(url, 
        {dados: form, 
        dados_adicionais: dadosAdicionais});
    }

    update(id: string, form: EditarClienteRequest): Observable<ClienteResponse> {
      const url = `${environment.apiUrl}/clientes/${id}`;

      return this.httpClient.put<ClienteResponse>(url, form);
    }

    delete(id: string): Observable<void> {
      const url = `${environment.apiUrl}/clientes/${id}`;

      return this.httpClient.delete<void>(url);
    }

    activate(id: string): Observable<void> {
      const url = `${environment.apiUrl}/clientes/${id}/ativar`;

      return this.httpClient.put<void>(url, {});
    }

    deactivate(id: string): Observable<void> {
      const url = `${environment.apiUrl}/clientes/${id}/inativar`;

      return this.httpClient.put<void>(url, {});
    }
}
