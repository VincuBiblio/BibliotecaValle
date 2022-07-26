import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Personausuario} from "../models/personausuario";
import {map, Observable} from "rxjs";
import {Parroquia} from "../models/ubicacion";

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

  updateCliente(personaRequest: Personausuario): Observable<Personausuario> {
    console.log(personaRequest)
    return this.http.put<Personausuario>(this.urlEndPoint + "/", personaRequest, {headers: this.httpHeaders})
  }

  getAllClientes():Observable<Personausuario[]>{
    return this.http.get(this.urlEndPoint+"/allClientes",{headers: this.httpHeaders}).pipe(map(Response => Response as Personausuario[]))
  }
}
