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
import {CursoComponent} from "./curso/curso.component";
import {TallerComponent} from "./taller/taller.component";
import {NuevousuarioComponent} from "./nuevousuario/nuevousuario.component";
import {TrasformaciondedatpsComponent} from "./trasformaciondedatps/trasformaciondedatps.component";
import { NuevoclienteComponent } from './nuevocliente/nuevocliente.component';
import { EditarclienteComponent } from './editarcliente/editarcliente.component';
import {CursoclienteComponent} from "./cursocliente/cursocliente.component";
import {HomeComponent} from "./home/home.component";


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
    path: 'informe-mensual',
    component: informeMensualComponent
  },
  {
    path: 'trasformaciones',
    component: TrasformaciondedatpsComponent
  },
  {
  path: 'curso',
    component: CursoComponent
  },
  {
  path: 'taller',
    component: TallerComponent
  },
  {
  path: 'nuevousuario',
    component: NuevousuarioComponent
  },
  {
    path: 'nuevocliente',
    component: NuevoclienteComponent
  },
  {
    path: 'editarcliente/:id',
    component: EditarclienteComponent
  },
  {
    path: 'agregarcliente_cursos',
    component: CursoclienteComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },

];

@NgModule({
  declarations: [
    UsuariosporedadesComponent,
    UsuariosporserviciosComponent,
    informeMensualComponent,
    UsuariosporgenerosComponent,
    UsuariospordispacidadComponent,
    TrasformaciondedatpsComponent,
    CursoComponent,
    TallerComponent,
    NuevousuarioComponent,
    NuevoclienteComponent,
    EditarclienteComponent,
    HomeComponent,
    CursoclienteComponent
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
