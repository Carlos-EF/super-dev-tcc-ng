import { ClienteResponse } from '@/models/cliente.model';
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
}
