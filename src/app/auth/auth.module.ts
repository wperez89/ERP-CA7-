import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ValidarCuentaComponent } from './validar-cuenta/validar-cuenta.component';
import { VerificarOTPComponent } from './verificar-otp/verificar-otp.component';
import { ChangePasswordComponent } from './change-password/change-password.component';




@NgModule({
  declarations: [
    LoginComponent,
    ValidarCuentaComponent,
    VerificarOTPComponent,
    ChangePasswordComponent
  ],
  exports:[
    LoginComponent,
    ValidarCuentaComponent,
    VerificarOTPComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
})
export class AuthModule { }
