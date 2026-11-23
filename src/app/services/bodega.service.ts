import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bodega, NewBodega } from '../models/bodega.model';

@Injectable({ providedIn: 'root' })
export class BodegaService {
  private http = inject(HttpClient);

  // Backend Spring Boot el backend habilita CORS para http://localhost:4200
  private readonly url = 'http://localhost:8080/bodegas';

  /** GET /bodegas - bodegas con sus productos asociados. */
  list(): Observable<Bodega[]> {
    return this.http.get<Bodega[]>(this.url);
  }

  /** POST /bodegas - registra una bodega. */
  create(bodega: NewBodega): Observable<Bodega> {
    return this.http.post<Bodega>(this.url, bodega);
  }
}
