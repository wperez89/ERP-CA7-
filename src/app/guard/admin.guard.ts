import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard  {
  constructor(private usuario:UsuarioService, private router: Router)
  {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot)
    {
      //console.log(this.usuario.role)
      if(this.usuario.role === 'ADMIN')
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
