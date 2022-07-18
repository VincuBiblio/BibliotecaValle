import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {IniciosesionComponent} from "./iniciosesion/iniciosesion.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "../../../material/material.module";
import {HttpClientModule} from "@angular/common/http";

const routes: Routes = [
  {
    path: 'inicio_sesion',
    component: IniciosesionComponent
  }
];

@NgModule({
  declarations: [
    IniciosesionComponent
  ],
  exports:[RouterModule],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthModule { }
