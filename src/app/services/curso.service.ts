import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Curso} from "../models/curso";
import {map, Observable} from "rxjs";
import {Clientecurso, Personausuario} from "../models/personausuario";

@Injectable({
  providedIn: 'root'
})
export class CursoService {


  private urlEndPoint: string = 'http://localhost:8080/api/curso';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
  })

  constructor(private http: HttpClient) {
  }

  savecurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.urlEndPoint + "/registrarCurso", curso, {headers: this.httpHeaders})
  }

  getAll(): Observable<Curso[]> {
    return this.http.get(this.urlEndPoint + "/allCursos", {headers: this.httpHeaders}).pipe(map(Response => Response as Curso[]))
  }

  agregarclienteacurso(cliente_id?: Number, curso_id?:Number):Observable<Personausuario>{
    return this.http.post<Personausuario>(this.urlEndPoint + "/agregar/" + cliente_id + "/" +curso_id,"", {headers: this.httpHeaders})
  }

}
