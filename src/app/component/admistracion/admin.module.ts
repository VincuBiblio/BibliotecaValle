import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "../../../material/material.module";
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {UsuariosporedadesComponent} from './usuariosporedades/usuariosporedades.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsuariosporserviciosComponent} from './usuariosporservicios/usuariosporservicios.component';
import {informeMensualComponent} from "./informe-mensual/informe-mensual.component";


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
    path: 'informe-mensual',
    component: informeMensualComponent
  },

];

@NgModule({
  declarations: [
    UsuariosporedadesComponent,
    UsuariosporserviciosComponent,
    informeMensualComponent
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
