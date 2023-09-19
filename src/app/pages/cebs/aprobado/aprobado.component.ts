import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialog, Toast, showConfirmationAlert } from 'src/app/helpers/Notificaciones';
import { aprobacion } from 'src/app/models/cebs/tablas.models';
import { CebsService } from 'src/app/services/cebs.service';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-aprobado',
  templateUrl: './aprobado.component.html',
  styleUrls: ['./aprobado.component.scss']
})
export class AprobadoComponent implements OnInit {
  public aprobacionForm:FormGroup;
  public cargando:boolean = false;
  public aprobadores:aprobacion[]=[];
  public id:string ;
  public persona:string;
  public anio:number;
  public estadoSubsidio:string;
  public aprobado:string;
  public entidadAprob: number = 2;

  constructor(private activatedRoute: ActivatedRoute, private personaService:PersonasService,private fb:FormBuilder,
    private cebsServices:CebsService, private router:Router) 
  {
    this.aprobacionForm= this.fb.group(
      {
        CEDULA:['',Validators.required],
        NOMBRE:['',Validators.required],
        ID_REFERENCIA:[''],
        ID_APROBACION:[''],
        NUM_SESION:[''],
        FECHA:['',Validators.required],
        TIPO_APROB:['',Validators.required],
        OBSERVACION:[''],
        ESTADO:['A',Validators.required],
      }
    )
   }

  ngOnInit(): void {
    this.cargando = true;
    this.aprobacionForm.reset;
    this.activatedRoute.params.subscribe(({id,persona,periodo,estado,aprobado})=>
    {
      this.id = id;
      this.persona = persona;
      this.anio = periodo;
      this.estadoSubsidio = estado;
      this.aprobado = aprobado;
    })
    this.cargarPersona();
    this.cargarAprobaciones();
    this.cargarInfoAprobacionSub();
    //console.log(this.aprobado)
    this.cargando = false;
  }

  guardarAprobacion()
  {
    if(this.aprobacionForm.invalid)
    {
      Toast.fire({
        title: "Rellene todos los campos"
      })
      
      return
    }
    //Guardar Registro Nuevo
    if(this.aprobado === 'false')
    {
      this.cebsServices.crearAprobacion(this.aprobacionForm.value)
    .subscribe((resp)=>
    {
      if(!resp.ok)
      {
        Toast.fire({
          title: resp.msg
        })
        this.aprobacionForm.reset;
      }
      else
      {
        SuccessDialog.fire({
          title: resp.msg
        });
        this.aprobacionForm.reset;
        this.router.navigate(['/cebs/subsidios/edit/',this.persona,this.anio,this.estadoSubsidio,this.id]);
      }
    })
    }
    //Actualizar Registro
    else
    {
      //console.log(this.aprobacionForm.value);
      this.cargando = true;
      this.cebsServices.actualizarAprobacion(this.aprobacionForm.value)
      .subscribe((resp)=>
      {
        this.cargando = true;
        if(!resp.ok)
        {
          Toast.fire({
            title: resp.msg
          })
          this.aprobacionForm.reset;
        }
        else
        {
          SuccessDialog.fire({
            title: resp.msg
          });
          this.aprobacionForm.reset;
          this.router.navigate(['/cebs/subsidios/edit/',this.persona,this.anio,this.estadoSubsidio,this.id]);
        }
      })
    }
  }

  //Cargar Datos Personales
  cargarPersona()
  {
    this.personaService.getNombresPersonaID(this.persona)
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.aprobacionForm.patchValue({
        CEDULA:resp.IDENTIFICACION,
        NOMBRE:resp.NOMBRE,
        ID_REFERENCIA:this.id,
      })
    })
  }

  //cargarAprobaciones
  cargarAprobaciones()
  {
    this.cebsServices.cargarAprobadoresActivos()
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.aprobadores = resp;
    })
  }

  //CambiarAprobadores
  cambioAprobacion()
  {
    this.entidadAprob =  this.aprobacionForm.get('TIPO_APROB').value;
    //console.log(resp);
    this.aprobacionForm.patchValue({
      NUM_SESION:"",
    })
  }

  //cargarInfoAprobacionesSubsidio
  cargarInfoAprobacionSub()
  {
    if(this.aprobado === 'true')
    {
      this.cebsServices.cargarAprobacionSubId(this.id,this.anio)
      .subscribe((resp:any)=>
      {
        console.log(resp)
        if(resp.ok)
        {
          this.aprobacionForm.patchValue({
            ID_APROBACION:resp.registro[0].ID_APROBACION,
            TIPO_APROB:resp.registro[0].TIPO_APROB,
            NUM_SESION:resp.registro[0].NUM_SESION,
            FECHA:resp.registro[0].FECHAFORM,
            ESTADO:resp.registro[0].ESTADO,
            OBSERVACION: resp.registro[0].OBSERVACION,
          })
          this.entidadAprob = resp.registro[0].TIPO_APROB;
        }
      })
    }
  }

  //Anular Transacción
  anularAprobacion()
  {
    const title = 'Estás Seguro de Anular la Sesión de Aprobación del Subsidio:';
    const registro = this.id;
    showConfirmationAlert(title,registro,"Anular").then((result) => {
        if (result.isConfirmed) {
          // Aquí puedes poner la lógica para eliminar el elemento
          this.cebsServices.anularAprobacion(this.aprobacionForm.value)
          .subscribe((resp:any)=>
          {
            //console.log(resp)
            if(resp.ok)
            {
              SuccessDialog.fire(
                {
                  title:(resp.msg)
                }
              )
              this.aprobacionForm.reset;
              this.router.navigate(['/cebs/subsidios/edit/',this.persona,this.anio,this.estadoSubsidio,this.id]);
            }
            else
            {
              Toast.fire(
                {
                  title:(resp.msg)
                }
              )
            }
          })
        }
      });
  }
}
