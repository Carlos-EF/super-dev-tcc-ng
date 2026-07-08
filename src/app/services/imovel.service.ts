import { CriarImovelRequest, EditarImovelRequest, ImovelResponse } from '@/models/imovel.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  private url = `${environment.apiUrl}/imoveis`;

  private httpClient = inject(HttpClient);

  getAll(): Observable<ImovelResponse[]> {
    return this.httpClient.get<ImovelResponse[]>(this.url);
  }

  getById(id: string): Observable<ImovelResponse> {
    const urlComId = `${this.url}/${id}`;

    return this.httpClient.get<ImovelResponse>(urlComId);
  }

  delete(id: string): Observable<void> {
    const urlComId = `${this.url}/${id}`;

    return this.httpClient.delete<void>(urlComId);
  }

  create(form: CriarImovelRequest): Observable<ImovelResponse> {
    return this.httpClient.post<ImovelResponse>(this.url, form);
  }

  update(
    id: string,
    form: EditarImovelRequest
  ): Observable<ImovelResponse> {
    const urlComId = `${this.url}/${id}`;

    return this.httpClient.put<ImovelResponse>(
      urlComId,
      form
    )
  }

  activate(id: string): Observable<void> {
    const urlComId = `${this.url}/${id}/ativar`;
    return this.httpClient.put<void>(urlComId, {});
  }

  inactivate(id: string): Observable<void> {
    const urlComId = `${this.url}/${id}/inativar`;
    return this.httpClient.put<void>(urlComId, {});
  }
}
