import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../../material/material.module";
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UsuariosporedadesComponent} from './usuariosporedades/usuariosporedades.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsuariosporserviciosComponent} from './usuariosporservicios/usuariosporservicios.component';
import {informeMensualComponent} from "./informe-mensual/informe-mensual.component";
import { UsuariosporgenerosComponent } from './usuariosporgeneros/usuariosporgeneros.component';
import { UsuariospordispacidadComponent } from './usuariospordispacidad/usuariospordispacidad.component';
import { TrasformaciondedatpsComponent } from './trasformaciondedatps/trasformaciondedatps.component';


const routes: Routes = [
  {
    path: 'usuarios_por_edad',
    component: UsuariosporedadesComponent
  },
  {
    path: 'usuarios_por_servicio',
    component: UsuariosporserviciosComponent
  },
  {
    path: 'usuarios_por_genero',
    component: UsuariosporgenerosComponent
  },
  {
    path: 'usuarios_por_discapacidad',
    component: UsuariospordispacidadComponent
  },
  {
    path: 'trasformaciones',
    component: TrasformaciondedatpsComponent
  },
  {
    path: 'informe-mensual',
    component: informeMensualComponent
  }


];

@NgModule({
  declarations: [
    UsuariosporedadesComponent,
    UsuariosporserviciosComponent,
    informeMensualComponent,
    UsuariosporgenerosComponent,
    UsuariospordispacidadComponent,
    TrasformaciondedatpsComponent
  ],
  exports: [RouterModule],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminModule {
}
