import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast, errorDialog, SuccessDialog } from 'src/app/helpers/Notificaciones';
import { rol } from 'src/app/interfaces/cargar-usuarios.interfaces';
import { Usuario } from 'src/app/models/User/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss']
})
export class NuevoComponent implements OnInit {
  public rol: rol[] = [];
  public userForm: FormGroup;

  constructor(private usuarioService:UsuarioService, private fb:FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.cargarRolUsuario();

    this.userForm= this.fb.group(
      {
        NOMBRE:['',Validators.required],
        IDENTIFICACION:['',Validators.required],
        APELLIDO1:['',Validators.required],
        PASWORD:['12345'],
        APELLIDO2:[''],
        EMAIL:['',Validators.required],
        ROL:['',Validators.required],
      });
  }

  createUser()
  {
    console.log(this.userForm.value);
    
    if(this.userForm.invalid)
    {
      return
    }
    else
    {
      this.usuarioService.crearPersonas(this.userForm.value)
    .subscribe(resp=>{
    //console.log(resp);
    SuccessDialog.fire(
      {
        title:("Usuario Creado Correctamente")
      }
    );
    this.router.navigate(['/usuario']);
    },
    (err) => { // Si sucede un error
        
      console.log(err);
      errorDialog.fire({
        title:err.error.msg
      })
    })
    }
  }
    //cargar Rol de Usuario
    cargarRolUsuario()
    {
      this.usuarioService.cargarRolUsuario()
      
      .subscribe((rol: rol[])=>
      {
        this.rol = rol;
        //console.log(this.rol)
      })
    }
}
