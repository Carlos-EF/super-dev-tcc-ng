import { CondominioResponse, CriarCondominioRequest } from '@/models/condominio.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CondominioService {
  private httpClient = inject(HttpClient);

  private url = `${environment.apiUrl}/condominios`;

  getAll(): Observable<CondominioResponse[]> {
    return this.httpClient.get<CondominioResponse[]>(this.url);
  }

  getById(
    id: string
  ): Observable<CondominioResponse> {
    const urlComId = `${this.url}/${id}`;

    return this.httpClient.get<CondominioResponse>(urlComId);
  }

  create(
    form: CriarCondominioRequest
  ): Observable<CondominioResponse> {
    return this.httpClient.post<CondominioResponse>(
      this.url,
      form);
  }
}
