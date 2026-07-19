import { CriarImagensImovelRequest, CriarImovelRequest, EditarImovelRequest, ImagensImovelResponse, ImovelResponse } from '@/models/imovel.model';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  private url = `${environment.apiUrl}/imoveis`;

  private urlImagens = `${environment.apiUrl}/imoveis/imagens`;

  private httpClient = inject(HttpClient);

  getAll(): Observable<ImovelResponse[]> {
    return this.httpClient.get<ImovelResponse[]>(this.url);
  }

  getAllImages(): Observable<ImagensImovelResponse | ImagensImovelResponse[] | null> {
    return this.httpClient.get<ImagensImovelResponse | ImagensImovelResponse[] | null>(this.urlImagens);
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

  createImages(
    id: string,
    form: CriarImagensImovelRequest | CriarImagensImovelRequest[] | null
  ): Observable<ImagensImovelResponse | ImagensImovelResponse[] | null> {
    return this.httpClient.post<ImagensImovelResponse | ImagensImovelResponse[] | null>(this.urlImagens,
      {
        id: id,
        imagens: form
      }
    );
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
