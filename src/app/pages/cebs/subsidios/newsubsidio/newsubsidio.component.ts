import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  SuccessDialog,
  Toast,
  errorDialog,
} from "src/app/helpers/Notificaciones";
import { Usuario } from "src/app/models/User/usuario.models";
import { beneficios, periodo } from "src/app/models/cebs/tablas.models";
import { AvaluoService } from "src/app/services/avaluo.service";
import { CebsService } from "src/app/services/cebs.service";
import { PersonasService } from "src/app/services/personas.service";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: "app-newsubsidio",
  templateUrl: "./newsubsidio.component.html",
  styleUrls: ["./newsubsidio.component.scss"],
})
export class NewsubsidioComponent implements OnInit {
  public subsidioForm: FormGroup;
  public beneficios: beneficios[] = [];
  public periodo: periodo[] = [];
  public usuario: Usuario;
  public cedula: string = "";
  public cargando: boolean = false;
  public existe: boolean = false;
  public existeAsociado: boolean = false;
  public btnCrear: boolean = false;
  public idpersona: string = "";
  public editar: boolean = false;
  public archivoLength: boolean = false;
  public archivoSelected: File;
  public id:string ;
  public persona:string;
  public anio:number;
  public estado:string;
  public aprobado: boolean = false;
  public pagado: boolean = false;
  public document: string = '';

  constructor(
    private personaService: PersonasService,
    private fb: FormBuilder,
    private cebsServices: CebsService,
    private usuarioservice: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private avaluoService:AvaluoService
  ) {
    this.usuario = usuarioservice.usuario;
    this.subsidioForm = this.fb.group({
      ID_SUBSIDIO: ["", Validators.required],
      NOMBRE: ["", Validators.required],
      ID_PERSONA: ["", Validators.required],
      MONTO_FACT: [0, Validators.required],
      MONTO_SUBSIDIO: [0, Validators.required],
      FECHA: ["", Validators.required],
      USUARIO_RECIBE: ["", Validators.required],
      TIPO_BENEFICIO: ["", Validators.required],
      PERIODO: ["", Validators.required],
      APROBADO: [false, Validators.required],
      PAGADO: [false, Validators.required],
      OBSERVACION: ["", Validators.required],
      ESTADO: ["A", Validators.required],
      DOCUMENTO: ["", Validators.required],
      EDITADO:[false]
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id,persona,periodo,estado})=>
    {
      this.id = id;
      this.persona = persona;
      this.anio = periodo;
      this.estado = estado;
    })
    this.cargarBeneficios();
    this.cargarPeriodo();
    this.cargarsubsidioID(this.id ,this.persona,this.anio,this.estado)
  }

  cargarBeneficios() {
    this.cebsServices.cargarBeneficiosActivos().subscribe((resp: any) => {
      //console.log(resp);
      this.beneficios = resp;
    });
  }

  cargarPeriodo() {
    this.cebsServices.cargarPeriodosActivos().subscribe((resp: any) => {
      //console.log(resp);
      this.periodo = resp;
    });
  }

  cargarsubsidioID(id:string,persona:string,periodo:number,estado:string)
  {
    
    if(this.id)
    {
      this.cargando = true;
      this.editar = true;
      this.cargarPersona();
    this.cebsServices.cargarSubsidioID(id,persona,periodo,estado)
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      //console.log(resp.ayuda[0])
      this.aprobado = resp.ayuda[0].APROBADO;
      this.pagado = resp.ayuda[0].PAGADO;
      if(resp.ok)
      {
        this.subsidioForm.patchValue({
          ID_SUBSIDIO:id,
          MONTO_FACT:resp.ayuda[0].MONTO_FACT,
          MONTO_SUBSIDIO:resp.ayuda[0].MONTO_SUBSIDIO,
          FECHA:resp.ayuda[0].FECHA,
          TIPO_BENEFICIO:resp.ayuda[0].TIPO_BENEFICIO,
          PERIODO:resp.ayuda[0].PERIODO,
          OBSERVACION:resp.ayuda[0].OBSERVACION,
          APROBADO:this.aprobado,
          PAGADO:resp.ayuda[0].PAGADO,
          USUARIO_RECIBE:resp.ayuda[0].USUARIO_RECIBE,
          EDITADO:this.editar
        })
      }
      this.document = resp.ayuda[0].DOCUMENTO;
      this.pagado ? this.deshabilitarCampos() : null
      this.cargando = false;
    })
    }
    
    //console.log(this.pagado)
  }

  cargarPersona()
  {
    this.personaService.getNombresPersonaID(this.persona)
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.subsidioForm.patchValue({
        IDENTIFICACION:resp.IDENTIFICACION,
        NOMBRE:resp.NOMBRE,
      })
    })
  }

  guardarSubsidio() {
    this.subsidioForm.patchValue({
      USUARIO_RECIBE: this.usuario.EMAIL,
    });
    //console.log(this.subsidioForm.value);
    this.cebsServices
      .crearSubsidio(this.subsidioForm.value, this.archivoSelected)
      .subscribe(
        (resp: any) => {
          //console.log(resp)
          if (!resp.ok) {
            Toast.fire({
              title: resp.msg,
            });
          } else {
            SuccessDialog.fire({
              title: resp.msg,
            });
            this.subsidioForm.reset;
            this.router.navigate(["/cebs/subsidios"]);
          }
        },
        (err) => {
          // Si sucede un error

          //console.log(err);
          errorDialog.fire({
            title: err.error.msg,
          });
          this.subsidioForm.reset;
          this.router.navigate(["/cebs/subsidios"]);
        }
      );
      
  }

  existePersona(id: string) {
    //console.log(id.length);
    if (id.length < 1) {
      return;
    } else {
      this.personaService.getExistePersona(id).subscribe((resp: any) => {
        //console.log(resp);
        if (!resp.ok) {
          Toast.fire({
            title: resp.msg,
          });
        } else {
          //console.log(resp.Asociado[0])
          this.idpersona = resp.Asociado[0].ID_FISICO;
          this.existeAsociado = true;
          this.btnCrear = true;
          this.subsidioForm.patchValue({
            NOMBRE: resp.Asociado[0].NOMBRE,
            ID_PERSONA: this.idpersona,
          });
        }
      });
    }
  }

  abrirformSubsidio() {
    const id = this.subsidioForm.get("ID_PERSONA").value;
    //console.log("abrirForm")
    this.cebsServices.cargarexisteSubsidio(id).subscribe((resp: any) => {
      //console.log(resp)
      if (!resp.ok) {
        errorDialog.fire({
          title: resp.msg,
        });
        this.subsidioForm.reset();
      } else {
        this.existe = true;
        this.btnCrear = false;
      }
    });
  }

  //Calcular Monto de Subsidio
  calculoSubsidio() {
    const monto = this.subsidioForm.get("MONTO_FACT").value;
    if (monto >= 37000) {
      this.subsidioForm.patchValue({
        MONTO_SUBSIDIO: 15000,
      });
    } else {
      this.subsidioForm.patchValue({
        MONTO_SUBSIDIO: monto * 0.4,
      });
    }
  }

  evitarSubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
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

  deshabilitarCampos() {
    this.subsidioForm.get('MONTO_FACT').disable();
    this.subsidioForm.get('FECHA').disable();
    this.subsidioForm.get('PERIODO').disable();
    this.subsidioForm.get('TIPO_BENEFICIO').disable();
  }
}
