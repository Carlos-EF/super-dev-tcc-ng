import { CorretorResponse } from '@/models/corretor.model';
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
}
