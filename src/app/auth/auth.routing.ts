import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ValidarCuentaComponent } from './validar-cuenta/validar-cuenta.component';
import { NgModule } from '@angular/core';
import { VerificarOTPComponent } from './verificar-otp/verificar-otp.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes =
[
    {path:'login',component:LoginComponent},
    {path:'activateaccount:/id',component:ValidarCuentaComponent},
    {path:'verify-otp:/id',component:VerificarOTPComponent},
    {path:'change-password',component:ChangePasswordComponent}
]

@NgModule({
    imports: 
    [
      RouterModule.forChild(routes)
    ],
    exports:[RouterModule]
  })
  
  export class AuthRoutingModule { }