import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/User/usuario.models';

declare var $: any;

@Component({
  selector: 'app-horizontal-navigation',
  templateUrl: './horizontal-navigation.component.html'
})
export class HorizontalNavigationComponent implements OnInit {
  @Output() toggleSidebar = new EventEmitter<void>();

  public user: any
  public usuario: Usuario;
  public config: PerfectScrollbarConfigInterface = {};
  public showSearch = false;
  public isCollapsed = false;
  public showMobileMenu = false;
  public img:string = 'no-image.jpg'
  public nombreImagen;


  constructor(private usuarioservice:UsuarioService, private router:Router) {
      this.usuario = usuarioservice.usuario;
  }
  ngOnInit(): void {
    this.getImageUrl()
  }

  getImageUrl()
  {
    //console.log(this.usuario.IMG)
    if(this.usuario.IMG)
    {
      this.img = this.usuario.IMG
    }
    this.nombreImagen = this.usuarioservice.verImagen('usuarios', this.img);
  }
  


  logOut()
  {
    this.usuarioservice.logOut();
  }

}
