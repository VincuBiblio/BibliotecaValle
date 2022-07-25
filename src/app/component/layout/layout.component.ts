import {Component, OnInit} from '@angular/core';
import {Personausuario} from "../../models/personausuario";
import {Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  activar?:boolean=false;
  public email?: string;
  panelOpenState = false;
  personausuario: Personausuario = new Personausuario();
  issloading = true;

  constructor(private router: Router) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.issloading = false;
    }, 1000)
  }

  ngOnInit(): void {
    if (JSON.parse(sessionStorage['personausuario']) != "") {
      this.personausuario = JSON.parse(sessionStorage['personausuario']);
      this.email = JSON.parse(sessionStorage['personausuario']).email
      if(this.email=='leogg@gmail.com'){
        this.activar=false;
      }else{
        this.activar=true;
      }

      sessionStorage.clear;
    } else {
      sessionStorage.clear;
      localStorage.removeItem("personausuario");
      sessionStorage.setItem('personausuario', JSON.stringify(""));
      this.router.navigate(['auth/inicio_sesion']).then(() => {
        window.location.reload();
      });
    }
  }

  logout(): void {
    sessionStorage.clear;
    localStorage.removeItem("personausuario");
    sessionStorage.setItem('personausuario', JSON.stringify(""));
    this.router.navigate(['/auth/inicio_sesion']).then(() => {
    });
  }

}
