import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {IniciarsesionService} from "../../../services/iniciarsesion.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Personausuario} from "../../../models/personausuario";
import Swal from "sweetalert2";
@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class IniciosesionComponent implements OnInit {


  isLinear = true;
  loginForm!: FormGroup;
  issloading = true;
  email?: String;

  public personaRequest: Personausuario = new Personausuario();


  habilitar: boolean = true;


  constructor(private iniciarsesionService: IniciarsesionService, private activatedRoute: ActivatedRoute,
              private router: Router, private _formBuilder: FormBuilder) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.issloading = false;
    }, 2000)
  }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', Validators.required],
      clave: ['', Validators.required],
    });
  }

  login(personausuario: Personausuario) {
    this.iniciarsesionService.Login(this.personaRequest).subscribe(
      data => {
        sessionStorage.setItem('personausuario', JSON.stringify(data));
        console.log(data)
        this.router.navigate(['/panel/biblioteca/home']);
      }, err => {
        Swal.fire({
          title: 'Usuario o constraseña incorrectos',
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
      }
    )
  }
}
