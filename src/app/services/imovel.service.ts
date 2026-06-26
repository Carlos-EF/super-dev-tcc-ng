import { ImovelResponse } from '@/models/imovel.model';
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
}
