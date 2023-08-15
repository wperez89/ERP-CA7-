
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/User/menuFront.models';

const base_url = environment.base_urlSql;

@Injectable({
  providedIn: 'root'
})
export class MenuFrontService {

  constructor(private http: HttpClient, private router: Router,) { }

  cargarMainMenu()
   {
     const url = `${base_url}/menu/mainmenu`;
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         menu:Menu[]
       })=>resp.menu)
     );
   }

  cargarParentMenu()
   {
     const url = `${base_url}/menu/parentmenu`;
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         menu:Menu[]
       })=>resp.menu)
     );
   }
  
   cargarSubMenu()
   {
     const url = `${base_url}/menu/submenu`;
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         menu:Menu[]
       })=>resp.menu)
     );
   }

   cargarSubMenuId(id:number)
   {
     const url = `${base_url}/menu/submenu/${id}`;
     return this.http.get(url)
     .pipe(
       map((resp:{
         ok:boolean,
         menu:Menu[]
       })=>resp.menu)
     );
   }

  crearOpcionMainMenu(menu:Menu)
{
  const url = `${base_url}/menu/mainmenu`;
  return this.http.post(url,menu)
        .pipe(
          map((resp:{
            ok:boolean, 
            menu:Menu[],
            msg:string
          })=>resp)
        );
  }

  crearOpcionSubMenu(menu:Menu)
{
  const url = `${base_url}/menu/subMenu`;
  return this.http.post(url,menu)
        .pipe(
          map((resp:{
            ok:boolean, 
            menu:Menu[],
            msg:string
          })=>resp)
        );
  }

  udpateOpcionMainMenu(menu:Menu)
  {   
    const url = `${base_url}/menu/mainmenu`;
    return this.http.put(url,menu)
          .pipe(
            map((resp:{
              ok:boolean, 
              msg:string
            })=>resp)
          );
  }

  cargaropcionesMenu(id:number)
  {
    const url = `${base_url}/menu/roleMenu/${id}`;
    return this.http.get(url)
    .pipe(
      map((resp:{
        ok:boolean,
        menu:Menu[]
      })=>resp.menu)
    );
  }

  inactivateOpcionMenu(id:number, datos:any)
  {   
    const url = `${base_url}/menu/roleMenu/Inactivate/${id}`;
    return this.http.put(url,datos)
          .pipe(
            map((resp:{
              ok:boolean, 
              msg:string
            })=>resp)
          );
  }

  activateOpcionMenu(id:number, datos:any)
  {   
    const url = `${base_url}/menu/roleMenu/Activate/${id}`;
    return this.http.put(url,datos)
          .pipe(
            map((resp:{
              ok:boolean, 
              msg:string
            })=>resp)
          );
  }
  cargaropcionesNOhabilitadas(id:number)
  {
    const url = `${base_url}/menu/roleMenuOptions/${id}`;
    return this.http.get(url)
    .pipe(
      map((resp:{
        ok:boolean,
        opciones:[]
      })=>resp.opciones)
    );
  }
  crearOpcionRoleMenu(menu:any)
  {
    const url = `${base_url}/menu/roleMenuOptions`;
    return this.http.post(url,menu)
          .pipe(
            map((resp:{
              ok:boolean, 
              msg:string
            })=>resp)
          );
    }
}
