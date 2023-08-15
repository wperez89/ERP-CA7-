import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'angular-feather/icons';
import { SuccessDialog, errorDialog } from 'src/app/helpers/Notificaciones';
import { rol } from 'src/app/interfaces/cargar-usuarios.interfaces';
import { Usuario } from 'src/app/models/User/usuario.models';
import { Estados } from 'src/app/models/global';
import { GlobalService } from 'src/app/services/global.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  public usuarios: Usuario[]
  public editar: any = {
    NOMBRE:'', APELLIDO1:'',APELLIDO2:'', EMAIL:'',ROL:'', ESTADO:''
  }
  public rol: rol[] = [];
  public estado: Estados[] = [];
  public userUpdateForm: FormGroup;
  public idUser: string = '';
  public rolAsignado: string = "1"
  
  constructor(private usuarioService: UsuarioService,private activatedRoute: ActivatedRoute, private fb:FormBuilder,
    private globalService:GlobalService, private router: Router) { }

  ngOnInit(): void {
    //obtener el Id del Paramtero
    this.activatedRoute.params
      .subscribe(({id})=> this.cargarUsuarios(id));

    this.cargarRolUsuario();
    this.cargarEstado();
    this.rolAsignado = this.usuarioService.role;
      this.userUpdateForm= this.fb.group(
        {
          NOMBRE:['',Validators.required],
          APELLIDO1:['',Validators.required],
          APELLIDO2:[''],
          EMAIL:['',Validators.required],
          ROL:['',Validators.required],
          ESTADO:['',Validators.required],
        });
  }

  cargarUsuarios(id:string)
    {
      this.usuarioService.getUserID(id)
      .subscribe((user:any)=>
        {
          this.usuarios = user;
          //this.rolAsignado = user.ROL
          this.idUser = user.ID_USUARIO;
          this.userUpdateForm.patchValue({
            NOMBRE:user.NOMBRE,
            APELLIDO1:user.APELLIDO1,
            APELLIDO2:user.APELLIDO2,
            EMAIL:user.EMAIL,
            ROL:user.ROL,
            ESTADO: user.ESTADO
          })
        })
        
    }

    //cargar Rol de Usuario
    cargarRolUsuario()
    {
      this.usuarioService.cargarRolUsuario()
      
      .subscribe((rol: rol[])=>
      {
        this.rol = rol;
        //console.log(this. rol)
      })
    }

    //cargar Estado de Usuario
    cargarEstado()
    {
      this.globalService.cargarEstados()
      
      .subscribe((estados: Estados[])=>
      {
        this.estado = estados;
        //console.log(this. estado)
      })
    }

    //Actualizar Usuario
    updateUsuarios()
    {
      //console.log(this.idUser);
      this.usuarioService.updatePersonas(this.userUpdateForm.value,this.idUser)
      .subscribe(resp=>{
        //console.log(resp);
        SuccessDialog.fire(
          {
            title:("Usuario Actualizado Correctamente")
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
