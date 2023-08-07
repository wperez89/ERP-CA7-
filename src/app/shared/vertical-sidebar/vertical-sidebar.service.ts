import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { RouteInfo } from './vertical-sidebar.metadata';
import { ROUTES } from './vertical-menu-items';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

const base_url = environment.base_urlSql;

@Injectable({
    providedIn: 'root'
})
export class VerticalSidebarService {

    public screenWidth: any;
    public collapseSidebar: boolean = false;
    public fullScreen: boolean = false;

    MENUITEMS = JSON.parse(localStorage.getItem('menu')) || []
    
    items = new BehaviorSubject<any>(this.MENUITEMS);
    constructor(private http: HttpClient,) {
    }

    cargarMenuRol(role:any)
   {
    const params = new HttpParams().set('role', role);

     const url = `${base_url}/menu`;
     return this.http.get(url,{params})
   }
}
