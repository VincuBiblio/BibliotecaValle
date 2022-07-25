import { Injectable } from '@angular/core';
import {Personausuario} from "../models/personausuario";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class IniciarsesionService {
  private urlEndPoint: string = 'http://localhost:8080/api/persona';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient) {
  }

  Login(personaRequest: Personausuario): Observable<Personausuario> {
    console.log(personaRequest)
    return this.http.post<Personausuario>(this.urlEndPoint + "/login", personaRequest)
  }
  Registro(personaRequest: Personausuario):Observable<Personausuario>{
    console.log(personaRequest)
    return this.http.post<Personausuario>(this.urlEndPoint+"/registroUsuario",personaRequest)
  }
}
