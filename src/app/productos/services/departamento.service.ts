import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Departamento } from '../domain/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private apiUrl = 'http://localhost:3000/departamento';

  constructor(private http: HttpClient) {}

  getDepartamentosOrdered(): Observable<Departamento[]> {
    return this.http.get<Departamento[]>(this.apiUrl).pipe(
      map(categorias => categorias.sort((a, b) => a.nombre.localeCompare(b.nombre)))
    );
  }
  getDepartamentoById(id: number): Observable<Departamento> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Departamento>(url);
  }

  createDepartamento(departamento: Departamento): Observable<Departamento> {
    return this.http.post<Departamento>(this.apiUrl, departamento);
  }

  updateDepartamento(departamento: Departamento): Observable<Departamento> {
    return this.http.put<Departamento>(`${this.apiUrl}/${departamento.id}`, departamento);
  }

  deleteDepartamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
