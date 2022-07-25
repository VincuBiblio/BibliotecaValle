import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Curso} from "../models/curso";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CursoService {


  private urlEndPoint: string = 'http://localhost:8082/api/curso';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
  })

  constructor(private http: HttpClient) {
  }

  savecurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.urlEndPoint+"/registrarCurso", curso, {headers: this.httpHeaders})
  }


 // agregarclienteacurso(curso: Curso, cliente:Cliente): Observable<Curso> {
 //    return this.http.post<Curso>(this.urlEndPoint+"/agregar/",cliente.id+"/"+ curso.id, {headers: this.httpHeaders})
 //  }
}
