import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Curso} from "../../../models/curso";
import {Router} from "@angular/router";
import {Personausuario} from "../../../models/personausuario";
import Swal from "sweetalert2";
import {IniciarsesionService} from "../../../services/iniciarsesion.service";

@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.css']
})
export class NuevousuarioComponent implements OnInit {
  isLinear = true;
  firstFormGroup!: FormGroup;
  personausuario: Personausuario = new Personausuario();


  omit_special_char(event: { charCode: any; }) {
    var k;
    k = event.charCode;
    return ((k >= 48 && k <= 57));
  }

  omit_max_char(event: { target: any; }) {
    var k;
    k = event.target.value.length;
    console.log(k)
    return (k <= 9);
  }

  constructor(private router: Router,private _formBuilder: FormBuilder, private inisiosessionService:IniciarsesionService) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      cedula: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechanacimiento: ['', Validators.required],
      edad: ['', Validators.required],
      genero: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]{7,10}')]],
      email: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
    });
  }
  registrar(personausuario: Personausuario) {

    this.inisiosessionService.Registro(this.personausuario).subscribe(data => {
      // console.log(data)
      Swal.fire({
        title: 'Usuario Registrado',
        confirmButtonColor: "#3e5b62",
        color:'#000000',
        background:"linear-gradient(#a3c6d3,#ffffff)",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.router.navigate(['/panel/biblioteca']);
    }, err => {
      Swal.fire({
        title: 'No registrado',
        text: err.error.message,
        confirmButtonColor: "#3e5b62",
        color:'#000000',
        background:"linear-gradient(#a3c6d3,#ffffff)",
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    })
  }
}
