import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./component/layout/layout.component";

const routes: Routes = [
  {path:'',redirectTo:'auth/inicio_sesion',pathMatch:'full'},
  {path:'auth',
    loadChildren:()=>
      import('./component/auth/auth.module').then((m)=>m.AuthModule)
  },{path:"panel",component:LayoutComponent,
    children:[
      {path:'biblioteca',
        loadChildren: ()=>
          import('./component/admistracion/admin.module').then((m)=>m.AdminModule)
      }
    ]
  }

]


@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
