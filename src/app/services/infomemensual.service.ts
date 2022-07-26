import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from "rxjs";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { servicioUsado1 } from '../models/informemensual';
import { Provincia } from '../models/ubicacion';

@Injectable({
    providedIn: 'root'
})

export class informeMensualService {
    _url = 'http://localhost:8082/api'


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


}