import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  { path: 'principal', component: PrincipalComponent, canActivate: [AuthGuard], canLoad: [AuthGuard] },
  { path: 'usuarios', component: UsuariosComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PagesRoutingModule { }
