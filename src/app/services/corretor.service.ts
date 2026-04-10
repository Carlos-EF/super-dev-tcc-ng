import { CorretorCriarRequest, CorretorEditarRequest, CorretorResponse } from '@/models/corretor.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorretorService {
  private httpClient = inject(HttpClient);

  getAll(): Observable<CorretorResponse[]> {
    const url = `${enviroment.apiUrl}/corretores`;

    return this.httpClient.get<CorretorResponse[]>(url);
  }

  create(form: CorretorCriarRequest): Observable<CorretorResponse> {
    const url = `${enviroment.apiUrl}/corretores`;

    return this.httpClient.post<CorretorResponse>(url, form);
  }

  getById(id: string): Observable<CorretorResponse> {
    const url = `${enviroment.apiUrl}/corretores/${id}`;

    return this.httpClient.get<CorretorResponse>(url);
  }

  update(id: string, form: CorretorEditarRequest): Observable<CorretorResponse> {
    const url = `${enviroment.apiUrl}/corretores/${id}`;
    
    return this.httpClient.put<CorretorResponse>(url, form);
  }

  activate(id: string): Observable<void> {
    const url = `${enviroment.apiUrl}/corretores/${id}/ativar`;

    return this.httpClient.put<void>(url, {});
  }

  deactivate(id: string): Observable<void> {
    const url = `${enviroment.apiUrl}/corretores/${id}/desativar`;

    return this.httpClient.put<void>(url, {});
  }
}
