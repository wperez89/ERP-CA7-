import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialog, errorDialog } from 'src/app/helpers/Notificaciones';
import { Usuario } from 'src/app/models/User/usuario.models';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  public totalUsuarios: number = 0;
  public pagina: number = 1;
  public pagesize: number = 10;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];
  public cargando: boolean = true;
  public filtro = '';
  modal: NgbModalRef;
  public rolForm: FormGroup;

  constructor(private usuarioService: UsuarioService, private modalService: NgbModal,
    private fb:FormBuilder,private router: Router) { }

  ngOnInit(): void {
    this.cargarUsuarios();

    this.rolForm= this.fb.group(
      {
        ROL:['',Validators.required],
        DESCRIPCION:['',Validators.required]
      });
  }

    //Cargar Usuarios de Base de Datos
    cargarUsuarios()
    {
      this.cargando = true;
      this.usuarioService.cargarUsuarios()
      .subscribe(({usuarios})=>
        {
          this.usuarios = usuarios;
          this.usuariosTemp = usuarios;
          this.cargando = false;
        })
    }

    
    createRol()
    {
      //console.log(this.rolForm.value);
      
      if(this.rolForm.invalid)
      {
        return
      }
      this.usuarioService.crearROL(this.rolForm.value)
      .subscribe(resp=>{
      //console.log(resp);
      SuccessDialog.fire(
        {
          title:("Rol Creado Correctamente")
        }
      );
      this.rolForm.reset();
      this.router.navigate(['/usuario']);
      },
      (err) => { // Si sucede un error
          
        //console.log(err.error.error.password.msg);
        errorDialog.fire({
          title:err.error.msg
        })
      })
    }  

    filtrar()
    {
      if(this.filtro)
      {
        var filter = new RegExp(this.filtro,'i');
        this.usuarios = this.usuariosTemp.filter(item=>filter.test(item.NOMBRE)||filter.test(item.APELLIDO1)||
        filter.test(item.APELLIDO2)||filter.test(item.EMAIL));
      }
      else
      {
        this.usuarios = this.usuariosTemp;
      }
    }

    // modal Open Backdrop Disabled
  modalOpenBackdrop(modalEditUser: any) {
    this.modalService.open(modalEditUser, {
      backdrop: false,
      centered: true
    });
  }

  closeModal() {
    this.modal.close();
  }
  editarUsuario(modalEditUser: any)
  {
    //console.log(this.usuarios)
  }
  
}
