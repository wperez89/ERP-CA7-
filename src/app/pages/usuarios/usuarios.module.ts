import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosComponent } from './usuarios.component';
import { NuevoComponent } from './nuevo/nuevo.component';
import { EditComponent } from './edit/edit.component';
import { RouterModule } from '@angular/router';
import { UsuariosRoutes } from './usuarios.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PasswordComponent } from './password/password.component';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';
import { MenuAgregarComponent } from './menu-agregar/menu-agregar.component';
import { SubmenuUsuarioComponent } from './submenu-usuario/submenu-usuario.component';
import { SubMenuAgregarComponent } from './sub-menu-agregar/sub-menu-agregar.component';
import { RolMenuComponent } from './rol-menu/rol-menu.component';
import { EditRolMenuComponent } from './edit-rol-menu/edit-rol-menu.component';



@NgModule({
  declarations: [
    UsuariosComponent,
    NuevoComponent,
    EditComponent,
    PasswordComponent,
    MenuUsuarioComponent,
    MenuAgregarComponent,
    SubmenuUsuarioComponent,
    SubMenuAgregarComponent,
    RolMenuComponent,
    EditRolMenuComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(UsuariosRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule,
  ]
})
export class UsuariosModule { }
