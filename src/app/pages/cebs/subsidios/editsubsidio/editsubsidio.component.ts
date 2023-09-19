import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { beneficios, periodo } from 'src/app/models/cebs/tablas.models';
import { AvaluoService } from 'src/app/services/avaluo.service';
import { CebsService } from 'src/app/services/cebs.service';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-editubsidio',
  templateUrl: './editsubsidio.component.html',
  styleUrls: ['./editsubsidio.component.scss']
})
export class EditsubsidioComponent implements OnInit {
  public editsubsidioForm:FormGroup;
  public cargando:boolean = false;
  public aprobado: boolean = false;
  public pagado: boolean = false;
  public beneficios:beneficios[]=[];
  public periodo:periodo[]=[];
  public document: string = '';
  public id:string ;
  public persona:string;
  public anio:number;
  public estado:string;

  constructor(private cebsServices:CebsService, private activatedRoute: ActivatedRoute,private fb:FormBuilder,
    private avaluoService:AvaluoService, private personaService:PersonasService) { 
    this.editsubsidioForm= this.fb.group(
      {
        NOMBRE:['',Validators.required],
        ID_PERSONA:['',Validators.required],
        ID_SUBSIDIO:['',Validators.required],
        IDENTIFICACION:['',Validators.required],
        MONTO_FACT:[0,Validators.required],
        MONTO_SUBSIDIO:[0,Validators.required],
        FECHA:['',Validators.required],
        USUARIO_RECIBE:['',Validators.required],
        TIPO_BENEFICIO:['',Validators.required],
        PERIODO:['',Validators.required],
        APROBADO:[false,Validators.required],
        PAGADO:[false,Validators.required],
        OBSERVACION:['',Validators.required],
        ESTADO:['A',Validators.required],
        DOCUMENTO:['',Validators.required],
      }
      )
  }

  ngOnInit(): void {
    this.cargando = true;
    this.activatedRoute.params.subscribe(({id,persona,periodo,estado})=>
    {
      this.id = id;
      this.persona = persona;
      this.anio = periodo;
      this.estado = estado;
    })
    this.cargarPersona();
    this.cargarsubsidioID(this.id,this.persona,this.anio,this.estado)
    this.cargarBeneficios();
    this.cargarPeriodo();
    this.cargando = false;
  }

  //Cargar Datos Personales
  cargarPersona()
  {
    this.personaService.getNombresPersonaID(this.persona)
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.editsubsidioForm.patchValue({
        IDENTIFICACION:resp.IDENTIFICACION,
        NOMBRE:resp.NOMBRE,
      })
    })
  }

  cargarsubsidioID(id:string,persona:string,periodo:number,estado:string)
  {
    this.cargando = true;
    //console.log(id);
    this.cebsServices.cargarSubsidioID(id,persona,periodo,estado)
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      //console.log(resp.ayuda[0])
      this.aprobado = resp.ayuda[0].APROBADO;
      this.pagado = resp.ayuda[0].PAGADO;
      if(resp.ok)
      {
        this.editsubsidioForm.patchValue({
          ID_SUBSIDIO:id,
          MONTO_FACT:resp.ayuda[0].MONTO_FACT,
          MONTO_SUBSIDIO:resp.ayuda[0].MONTO_SUBSIDIO,
          FECHA:resp.ayuda[0].FECHA,
          TIPO_BENEFICIO:resp.ayuda[0].TIPO_BENEFICIO,
          PERIODO:resp.ayuda[0].PERIODO,
          OBSERVACION:resp.ayuda[0].OBSERVACION,
          APROBADO:this.aprobado,
          PAGADO:resp.ayuda[0].PAGADO,
          USUARIO_RECIBE:resp.ayuda[0].USUARIO_RECIBE
        })
      }
      this.document = resp.ayuda[0].DOCUMENTO;
      this.cargando = false;
    })
    //console.log(this.pagado)
  }

  guardarSubsidio()
  {
    console.log(this.editsubsidioForm.value)
  }

  evitarSubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  cargarBeneficios()
  {
    this.cebsServices.cargarBeneficiosActivos()
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.beneficios = resp;
    })
  }

  cargarPeriodo()
  {
    this.cebsServices.cargarPeriodosActivos()
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.periodo = resp;
    })
  }

  downloadfile()
  {
    const nombreArchivo = this.document;
    console.log(nombreArchivo)
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

  //Calcular Monto de Subsidio
  calculoSubsidio() {
    const monto = this.editsubsidioForm.get("MONTO_FACT").value;
    if (monto >= 37000) {
      this.editsubsidioForm.patchValue({
        MONTO_SUBSIDIO: 15000,
      });
    } else {
      this.editsubsidioForm.patchValue({
        MONTO_SUBSIDIO: monto * 0.4,
      });
    }
  }

}
