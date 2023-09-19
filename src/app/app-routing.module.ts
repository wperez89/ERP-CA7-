import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthGuard } from './guard/auth.guard';
import { AdminGuard } from './guard/admin.guard';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './auth/login/login.component';
import { ValidarCuentaComponent } from './auth/validar-cuenta/validar-cuenta.component';
import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';
import { VerificarOTPComponent } from './auth/verificar-otp/verificar-otp.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { gerencialGuard } from './guard/gerencial.guard';
import { crediticioGuard } from './guard/crediticio.guard';

export const routes: Routes = [
  {
    path: 'validarlogin/:idUsuario',component: ValidarCuentaComponent,
  },  
  {
    path: 'login',component: LoginComponent,
  },
  {
    path: 'verify-otp/:idUsuario',component: VerificarOTPComponent,
  },
  {
    path: 'change-password',component: ChangePasswordComponent,
  }, 
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
    ]
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'usuario',
        canActivate:[AdminGuard],
        loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: 'persona',
        loadChildren: () => import('./pages/personas/personas.module').then(m => m.PersonasModule)
      },
      {
        path: 'avaluo',
        canActivate:[crediticioGuard],
        loadChildren: () => import('./pages/avaluos/avaluos.module').then(m => m.AvaluosModule)
      },
      {
        path: 'credito',
        canActivate:[crediticioGuard],
        loadChildren: () => import('./pages/credito/credito.module').then(m => m.CreditoModule)
      },
      
      {
        path: 'archivo-digital',
        canActivate:[gerencialGuard],
        loadChildren: () => import('./pages/archivo-digital/archivo-digital.module').then(m => m.ArchivoDigitalModule)
      },
      {
        path: 'cebs',
        canActivate:[AdminGuard],
        loadChildren: () => import('./pages/cebs/cebs.module').then(m => m.CebsModule)
      }
    ]
  },
  {
    path: '**',
    component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
