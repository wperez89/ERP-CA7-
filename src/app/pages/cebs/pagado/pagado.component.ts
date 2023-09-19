import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SuccessDialog, Toast, errorDialog, showConfirmationAlert } from 'src/app/helpers/Notificaciones';
import { Usuario } from 'src/app/models/User/usuario.models';
import { AvaluoService } from 'src/app/services/avaluo.service';
import { CebsService } from 'src/app/services/cebs.service';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pagado',
  templateUrl: './pagado.component.html',
  styleUrls: ['./pagado.component.scss']
})
export class PagadoComponent implements OnInit {
  public liquidarForm:FormGroup;
  public usuario: Usuario;
  public cargando:boolean=false;
  public id:string ;
  public persona:string;
  public anio:number;
  public estadoSubsidio:string;
  public pagado:string;
  public archivoLength: boolean = false;
  public archivoSelected: File;
  public document: string = '';
  public role:string = '';

  constructor(private fb:FormBuilder, private activatedRoute: ActivatedRoute, private personaService:PersonasService,
    private usuarioservice: UsuarioService,private cebsServices:CebsService, private avaluoService:AvaluoService,
    private router: Router) {
    this.usuario = usuarioservice.usuario;
    this.liquidarForm= this.fb.group(
      {
        CEDULA:['',Validators.required],
        NOMBRE:['',Validators.required],
        ID_REFERENCIA:['',Validators.required],
        ID_PAGO:['',Validators.required],
        NUM_COMPROBANTE:['',Validators.required],
        FECHA_PAGO:['',Validators.required],
        USUARIO:['',Validators.required],
        OBSERVACION:[''],
        DOCUMENTO:[''],
        ESTADO:['A',Validators.required],
        PAGADO:['false']
      }
    )
   }

  ngOnInit(): void {
    this.cargando = true;
    this.role = this.usuarioservice.role;
    this.liquidarForm.reset;
    this.activatedRoute.params.subscribe(({id,persona,periodo,estado,pagado})=>
    {
      this.id = id;
      this.persona = persona;
      this.anio = periodo;
      this.estadoSubsidio = estado;
      this.pagado = pagado;
    })
    this.cargarPersona();
    this.cargarDatosPago();
    this.cargando = false;
  }

  crearPago()
  {
    this.liquidarForm.get('FECHA_PAGO').enable();
    this.liquidarForm.get('NUM_COMPROBANTE').enable();
    this.liquidarForm.patchValue({
      USUARIO: this.usuario.EMAIL,
    });
    console.log(this.liquidarForm.value)
    this.cebsServices.crearLiquidación(this.liquidarForm.value,this.archivoSelected)
    .subscribe((resp:any)=>
    {
      console.log(resp)
      if (!resp.ok) {
        Toast.fire({
          title: resp.msg,
        });
      } else {
        SuccessDialog.fire({
          title: resp.msg,
        });
        this.liquidarForm.reset;
        this.router.navigate(["/cebs/subsidios"]);
      }
    },
    (err) => {
      // Si sucede un error

      //console.log(err);
      errorDialog.fire({
        title: err.error.msg,
      });
    })
  }

  anularPago()
  {
    console.log(this.liquidarForm.value)
    const title = 'Estás Seguro de Anular el Pago del Subsidio:';
    const registro = this.id;
    showConfirmationAlert(title,registro,"Anular").then((result) => {
        if (result.isConfirmed) {
          // Aquí puedes poner la lógica para eliminar el elemento
          this.cebsServices.anularLiquidacion(this.liquidarForm.value)
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
              this.liquidarForm.reset;
              this.router.navigate(['/cebs/subsidios/']);
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

  //Cargar Datos Personales
  cargarPersona()
  {
    //console.log(this.pagado)
    this.personaService.getNombresPersonaID(this.persona)
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.liquidarForm.patchValue({
        CEDULA:resp.IDENTIFICACION,
        NOMBRE:resp.NOMBRE,
        ID_REFERENCIA:this.id,
      })
    })
  }

  checkFileInput(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.archivoLength = true;
      this.archivoSelected = event.target.files[0];
      //console.log(this.archivoSelected)
    } else {
      this.archivoLength = false;
    }
  }

  downloadfile()
  {
    const nombreArchivo = this.document;
    //console.log(nombreArchivo)
    this.avaluoService.downloadFile(nombreArchivo,'cebs')
      .subscribe((archivo: Blob)=>
      {
        const url = URL.createObjectURL(archivo);
        const link = document.createElement('a');
        link.href = url;
        link.download = nombreArchivo;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
  }

  cargarDatosPago()
  {
    //console.log(this.pagado);
    if(this.pagado === 'true')
    {
      this.cebsServices.cargarLiquidacionID(this.id)
      .subscribe((resp:any)=>
      {
        const reg = resp.registro[0];
        console.log(reg);
        this.liquidarForm.patchValue({
          NUM_COMPROBANTE:reg.NUM_COMPROBANTE,
          FECHA_PAGO:reg.FECHA_PAGO,
          USUARIO:reg.USUARIO,
          OBSERVACION:reg.OBSERVACION,
          PAGADO:this.pagado,
          ID_PAGO:reg.ID_PAGO
        })
        this.document = reg.DOCUMENTO
      })
      this.deshabilitarCampos();
    }
  }

  deshabilitarCampos()
  {
    this.liquidarForm.get('NUM_COMPROBANTE').disable();
    this.liquidarForm.get('FECHA_PAGO').disable();
    this.liquidarForm.get('USUARIO').disable();
  }
}
