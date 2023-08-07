import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class crediticioGuard implements CanActivate {
  constructor(private usuario:UsuarioService, private router: Router)
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    {
      //console.log(this.usuario.role)
      if(this.usuario.role === 'ADMIN' || this.usuario.role === 'EJECUTIVO' || this.usuario.role === 'JEFATURA DE CREDITO')
      {
        return true
      }
      else
      {
        this.router.navigateByUrl('/home');
        return false;
      }
  }
  
}
