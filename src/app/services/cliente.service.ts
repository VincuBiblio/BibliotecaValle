import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Personausuario} from "../models/personausuario";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/persona';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
  })

  constructor(private http: HttpClient) {
  }

  saveCliente(personaRequest: Personausuario): Observable<Personausuario> {
    return this.http.post<Personausuario>(this.urlEndPoint + "/registroCliente", personaRequest, {headers: this.httpHeaders})
  }
}
