import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Curso} from "../models/curso";
import {map, Observable} from "rxjs";
import {Barrio, Canton, Parroquia, Provincia} from "../models/ubicacion";
import {Personausuario} from "../models/personausuario";

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  private urlEndPoint: string = 'http://localhost:8080/api';

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
  })

  constructor(private http: HttpClient) {
  }

  getAllProvincias():Observable<Provincia[]>{
    return this.http.get(this.urlEndPoint+"/provincia/allProvincias",{headers: this.httpHeaders}).pipe(map(Response => Response as Provincia[]))
  }
  getAllCantones():Observable<Canton[]>{
    return this.http.get(this.urlEndPoint+"/canton/allCantones",{headers: this.httpHeaders}).pipe(map(Response => Response as Canton[]))
  }
  getAllParroquias():Observable<Parroquia[]>{
    return this.http.get(this.urlEndPoint+"/parroquia/allParroquias",{headers: this.httpHeaders}).pipe(map(Response => Response as Parroquia[]))
  }


  saveBarrio(barrio: Barrio): Observable<Barrio> {
    return this.http.post<Barrio>(this.urlEndPoint +"/barrio/registrarBarrio", barrio,{headers: this.httpHeaders})
  }
  getAllBarrios():Observable<Barrio[]>{
    return this.http.get(this.urlEndPoint+"/barrio/all",{headers: this.httpHeaders}).pipe(map(Response => Response as Barrio[]))
  }
}
