import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Categoria } from '../domain/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:3000/categoria';

  constructor(private http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  getCategoriasOrdered(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl).pipe(
      map(categorias => categorias.sort((a, b) => a.nombre.localeCompare(b.nombre)))
    );
  }

  getCategoriaById(id: number): Observable<Categoria> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Categoria>(url);
  }

  createCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  updateCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(`${this.apiUrl}/${categoria.id}`, categoria);
  }

  deleteCategoria(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
