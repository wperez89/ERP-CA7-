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



@NgModule({
  declarations: [
    UsuariosComponent,
    NuevoComponent,
    EditComponent,
    PasswordComponent,
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
