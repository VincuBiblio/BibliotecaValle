import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Provincia } from '../models/ubicacion';
import { servicioUsado } from '../models/informemensual';

@Injectable({
    providedIn: 'root'
})

export class informeMensualService {
    _url = 'http://localhost:8080/api'


    private httpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token
    })



    constructor(
        private http: HttpClient,
    ) {
    }

    getServicioDiario(mes:any,anio:any) {
        let header = new HttpHeaders()
            .append('Type-content', 'aplication/json').append('Authorization', 'Bearer ' + JSON.parse(sessionStorage["personausuario"]).token)

        return this.http.get( `${this._url}/${'servicio/cliente/usoServicios'}/${mes}/${anio}` , {
            headers: header
        });
    }

    getServicioDiario1(mes:any,anio:any):Observable<servicioUsado[]>{
        return this.http.get( `${this._url}/${'servicio/cliente/usoServicios'}/${mes}/${anio}`,{headers: this.httpHeaders}).pipe(map(Response => Response as servicioUsado[]))
      }


}
