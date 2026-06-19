import { CondominioResponse } from '@/models/condominio.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CondominioService {
  private httpClient = inject(HttpClient);

  getAll(): Observable<CondominioResponse[]> {
    const url = `${environment.apiUrl}/condominios`;

    return this.httpClient.get<CondominioResponse[]>(url);
  }

  getById(
    id: string
  ): Observable<CondominioResponse> {
    const url = `${environment.apiUrl}/condominios/${id}`;

    return this.httpClient.get<CondominioResponse>(url);
  }
}
