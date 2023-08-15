import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AvaluoService } from 'src/app/services/avaluo.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-rep-cotizaciones',
  templateUrl: './rep-cotizaciones.component.html',
  styleUrls: ['./rep-cotizaciones.component.scss']
})
export class RepCotizacionesComponent implements OnInit {

  public estados: any;
  public informe: any[]=[];
  public profesiones: any;
  public estado: string = '';
  public fechaIni:string = '';
  public FechaFin:string = '';
  public tipo:string = '';
  public asignado:any = ''
  public repProfesional: FormGroup;
  public cargando: boolean = false;
  public pagina: number = 1;
  public pagesize: number = 10;

  constructor(private globalService:GlobalService, private fb: FormBuilder, private avaluoService:AvaluoService) { 
    this.repProfesional= this.fb.group(
      {
        ESTADO:[''],
        TIPO:[''],
        ASIGNADO:[''],
        FECHA_INICIO:[''],
        FECHA_FINAL:['']
      }
    )

  }
  
  ngOnInit(): void {
    this.cargarEstado();
    this.cargarProfesiones();
    this.estado;
    this.FechaFin;
    this.fechaIni;
    this.asignado;
    this.tipo;
  }

  //cargar Estado de Usuario
  cargarEstado(){
    this.globalService.cargarEstados()
    .subscribe((estados: any)=>
    {
      this.estados = estados;
    })
  }

  //cargar Estado de Usuario
  cargarProfesiones(){
    this.globalService.cargarProfesiones()
    .subscribe((occupation: any[])=>
    {
      this.profesiones = occupation;
      //console.log(occupation)
    })
  }

  cambioEstado()
  {
    this.estado = this.repProfesional.get('ESTADO').value;
    this.asignado= this.repProfesional.get('ASIGNADO').value;
    this.fechaIni = this.repProfesional.get('FECHA_INICIO').value;
    this.FechaFin = this.repProfesional.get('FECHA_FINAL').value;
    this.tipo = this.repProfesional.get('TIPO').value;     
  }
  cambioAsignado()
  {
    this.asignado=this.repProfesional.get('ASIGNADO').value;
  }

  generarConsulta()
  {
    this.cargando = true;
    this.estado = this.repProfesional.get('ESTADO').value;
    this.asignado= this.repProfesional.get('ASIGNADO').value;
    this.fechaIni = this.repProfesional.get('FECHA_INICIO').value;
    this.FechaFin = this.repProfesional.get('FECHA_FINAL').value;
    this.tipo = this.repProfesional.get('TIPO').value;    
    this.avaluoService.cargarInformeProfesionales(this.tipo,this.fechaIni,this.FechaFin, this.asignado)
    .subscribe((resp:any)=>
       {
        //console.log(resp)
        this.informe = resp;
       })
    this.repProfesional.patchValue(
      {
        ESTADO:'',
        TIPO:'',
        ASIGNADO:'',
        FECHA_INICIO:'',
        FECHA_FINAL:''
      }
    )
    this.cargando = false;
  }
}
