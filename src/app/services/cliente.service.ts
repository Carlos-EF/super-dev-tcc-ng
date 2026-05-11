import { ClienteResponse, CriarClienteRequest, EditarClienteRequest } from '@/models/cliente.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
    private httpClient = inject(HttpClient);

    getAll(): Observable<ClienteResponse[]> {
      const url = `${enviroment.apiUrl}/clientes`;

      return this.httpClient.get<ClienteResponse[]>(url);
    }

    create(form: CriarClienteRequest): Observable<ClienteResponse> {
      const url = `${enviroment.apiUrl}/clientes`;

      return this.httpClient.post<ClienteResponse>(url, form);
    }

    update(id: string, form: EditarClienteRequest): Observable<ClienteResponse> {
      const url = `${enviroment.apiUrl}/clientes/${id}`;

      return this.httpClient.put<ClienteResponse>(url, form);
    }

    delete(id: string): Observable<void> {
      const url = `${enviroment.apiUrl}/clientes/${id}`;

      return this.httpClient.delete<void>(url);
    }

    activate(id: string): Observable<void> {
      const url = `${enviroment.apiUrl}/clientes/${id}/ativar`;

      return this.httpClient.put<void>(url, {});
    }

    deactivate(id: string): Observable<void> {
      const url = `${enviroment.apiUrl}/clientes/${id}/inativar`;

      return this.httpClient.put<void>(url, {});
    }
}
