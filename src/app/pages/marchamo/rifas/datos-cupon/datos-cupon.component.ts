import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { Usuario } from 'src/app/models/User/usuario.models';
import { datosCupon } from 'src/app/models/marchamos/rifas';
import { MarchamoService } from 'src/app/services/marchamo.service';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-datos-cupon',
  templateUrl: './datos-cupon.component.html',
  styleUrls: ['./datos-cupon.component.scss']
})
export class DatosCuponComponent implements OnInit {
  public cargando:boolean = false;
  public datosCuponForm:FormGroup;
  public datos: datosCupon[] = [];
  public usuarios: Usuario[] = [];
  public idCliente: boolean = false;
  public id_Cupon:string = '';
  public nombre: boolean = false;
  
  constructor(private activatedRoute: ActivatedRoute,private fb:FormBuilder, private personaService:PersonasService,
    private marchamoService:MarchamoService, private usuarioService:UsuarioService, private router:Router) {
    this.datosCuponForm = this.fb.group({
      ID_CUPON:['',Validators.required],
      ID_CLIENTE:['',Validators.required],
      PLACA:['',Validators.required],
      PERIODO:['',Validators.required],
      FUNCIONARIO:['',Validators.required],
      OBSERVACION:['',Validators.required],
      COMPLETADO:['',Validators.required],
      ESTADO:['',Validators.required],
      IDENTIFICACION:['',Validators.required],
      NOMBRE:[''],
      EMAIL:[''],
      EMAIL_LAB:[''],
    })
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ESTADO,id,placa})=>
    {
      this.id_Cupon = id
      this.datosCuponForm.patchValue({
        ID_CUPON:id
      });
    });
    this.cargarUsuarios();
  }

  actualizarDatosCupon()
  {
    this.datosCuponForm.patchValue(
      {
        COMPLETADO: true
      })
      if(this.datosCuponForm.invalid)
      {
        Toast.fire({
          title: "Complete todos los campos",
        });
        return
      }
    //console.log(this.datosCuponForm.value);
    this.marchamoService.updatePersonaID(this.id_Cupon,this.datosCuponForm.value)
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      if(!resp.ok)
      {
        Toast.fire({
          title: resp.msg,
        });
      }
      else {
        SuccessDialog.fire({
          title: resp.msg,
        });
        this.datosCuponForm.reset;
        this.router.navigate(["/marchamo/listcupon"]);
      }
    })
  }

  evitarSubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  mostrarCliente()
  {
    let cedula = this.datosCuponForm.get("IDENTIFICACION").value;
    this.personaService.getPersonaEmail_ID(cedula)
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      if(!resp.ok)
      {
        Toast.fire({
          title: resp.msg,
        });
      }
      else
      {
        //console.log(resp);
        const persona = resp.persona[0];
        if(!persona.EMAIL && !persona.EMAIL_LAB)
        {
          errorDialog.fire({
            title: "Cliente No Tiene Correo Electrónico Asignado",
          }
          )
        }
        this.datosCuponForm.patchValue(
          {
            NOMBRE: persona.NOMBRE,
            IDENTIFICACION: persona.IDENTIFICACION,
            ID_CLIENTE: persona.ID_FISICO,
            EMAIL:persona.EMAIL,
            EMAIL_LAB:persona.EMAIL_LAB
          }
        )
        this.nombre = true;
        this.idCliente = true;
        this.marchamoService.cargarDatosCupones(this.id_Cupon)
          .subscribe((resp:any)=>
          {
            //console.log(resp);
            const datosCup = resp.datos[0];
            this.datosCuponForm.patchValue(
              {
                PLACA:datosCup.PLACA,
                PERIODO: datosCup.PERIODO,
                OBSERVACION: datosCup.OBSERVACION,
                ESTADO: datosCup.ESTADO,
              }
            )
          });
      }
    })
  }

  //Cargar Usuarios de Base de Datos
  cargarUsuarios()
    {
      this.usuarioService.cargarUsuariosActivos()
      .subscribe(({usuarios})=>
        {
          //console.log(usuarios);
          this.usuarios = usuarios;
        })
    }
}
