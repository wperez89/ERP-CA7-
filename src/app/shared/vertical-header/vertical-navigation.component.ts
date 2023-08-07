import { Component, AfterViewInit, EventEmitter, Output, OnInit } from '@angular/core';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/User/usuario.models';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

declare var $: any;

@Component({
  selector: 'app-vertical-navigation',
  templateUrl: './vertical-navigation.component.html'
})
export class VerticalNavigationComponent implements AfterViewInit,OnInit  {
  @Output() toggleSidebar = new EventEmitter<void>();

  public config: PerfectScrollbarConfigInterface = {};
  
  public user: any
  public usuario: Usuario;
  public showSearch = false;
  public img:string = 'no-image.jpg'
  public nombreImagen;

  // This is for Notifications
  notifications: Object[] = [
    {
      btn: 'btn-danger',
      icon: 'ti-link',
      title: 'Luanch Admin',
      subject: 'Just see the my new admin!',
      time: '9:30 AM'
    }
  ];

  // This is for Mymessages
  mymessages: Object[] = [
    {
      useravatar: 'assets/images/users/user1.jpg',
      status: 'online',
      from: 'Pavan kumar',
      subject: 'Just see the my admin!',
      time: '9:30 AM'
    }
  ];

  constructor(private usuarioservice:UsuarioService, private router:Router) {
    this.usuario = usuarioservice.usuario;
  }
  ngOnInit(): void {
    this.getImageUrl()
  }

  ngAfterViewInit() {}



  logOut()
  {
    this.usuarioservice.logOut();
  }


  getImageUrl()
  {

    if(this.usuario.IMG)
    {
      this.img = this.usuario.IMG
    }
    this.nombreImagen = this.usuarioservice.verImagen('usuarios', this.img);
  }
}