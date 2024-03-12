
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment-timezone';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { RangoSalario, condicionLaboral, sectorLaboral } from 'src/app/interfaces/cargar-personas.interface';
import { productoCredito } from 'src/app/models/credito/credito.models';
import { CreditoService } from 'src/app/services/credito.service';
import { GlobalService } from 'src/app/services/global.service';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-solicitud-cred',
  templateUrl: './solicitud-cred.component.html',
  styleUrls: ['./solicitud-cred.component.scss']
})
export class SolicitudCredComponent implements OnInit {
  solicitudForm:FormGroup;
  canales:[]=[];
  producto:productoCredito[]=[];
  rangoSalario: RangoSalario;
  condicionLab:condicionLaboral;
  sectorLab:sectorLaboral;
  cargando:boolean = false;
  existe:boolean = false;
  cedula:string = '';
  requerido: boolean = false;
  editado:boolean = false;
  idSolicitud:string = '';
  monto = '';
  numero: number;

  constructor(private personaService:PersonasService, private fb:FormBuilder, private globalServicio:GlobalService,
    private creditoService:CreditoService, private router: Router, private activatedRoute:ActivatedRoute) { 
    this.solicitudForm = this.fb.group(
      {
        IDENTIFICACION:['',Validators.required],
        NOMBRE:['',Validators.required],
        PRODUCTO:['',Validators.required],
        CANAL_COM:['',Validators.required],
        CONDICION_LAB:['',Validators.required],
        SECTOR_LAB:['',Validators.required],
        RANGO_SAL:['',Validators.required],
        ID_CLIENTE:['',Validators.required],
        MONTO:['',Validators.required],
        OBSERVACIONES:[''],
        ID_SOLICITUD:[''],
        FECHA:[''],
        ESTADO_ACTUAL:[''],
        EDITADO:[false]
      }
    )
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>
    {
      if(params['id']&&params['estado']&&params['cliente'])
      {
        this.idSolicitud = params['id'];
        const estado = params['estado'];
        const cliente = params['cliente']
        this.cargarSolicitudID(this.idSolicitud,estado,cliente);
      }
    })
    
    this.cargarCanales();
    this.cargarProductos();
    this.cargarCondicionLab();
    this.cargarRangoSalario();
    this.cargarSectorLab();
  }

  cargarAPICedula()
  {
    this.solicitudForm.reset;
    this.cedula = this.solicitudForm.get('IDENTIFICACION').value;
    this.personaService.getInfoLaboral(this.cedula).subscribe((resp:any)=>
    {
      if(resp.length > 0)
      {
        this.existe = true;
        console.log(resp[0])
        const rango = resp[0].RANGO_SALARIO;
        const condLab = resp[0].CONDICION_LAB;
        const sectorLab = resp[0].SECTOR_LAB;
        if(typeof rango === 'number' && typeof condLab === 'number' && typeof condLab === 'number')
        {
          this.solicitudForm.patchValue({
            NOMBRE:resp[0].NOMBRE,
            ID_CLIENTE:resp[0].ID_PERSONA,
            RANGO_SAL:rango,
            CONDICION_LAB:condLab,
            SECTOR_LAB:sectorLab
          })
        }
        else
        {
          Toast.fire(
            {
              text:("Favor Actualizar los datos Laborales"),
              timer:4000
            }
          )
          this.solicitudForm.reset();
          this.existe = false;
        }
      }
      else
      {
          errorDialog.fire(
            {
              text:("No existe Cedula"),
            }
          )
          this.existe = false;
      }
      
    })
  }

  guardarSolicitud()
  {
    console.log(this.solicitudForm.value);
    //Si el formulario tiene Campos Inválidos
      if (this.solicitudForm.invalid) {
        this.requerido = true;
        Toast.fire({
          text:"Completar todos los campos Obligatorios"
        })
        return;
      }
    else
    {

        console.log("Solicitud Nueva")
        this.creditoService.crearsolicitud(this.solicitudForm.value)
        .subscribe((resp:any)=>
        {
          console.log(resp)
          SuccessDialog.fire(
            {
              title:(resp.msg)
            });
            this.solicitudForm.reset;
            this.router.navigate(['/credito/solicitudescred'])
        },
        (error) => { // Si sucede un error
          errorDialog.fire(
            {
              text:(error.msg)
            }
          )
        })

    }
  }

  //Canales de Comunicación
  cargarCanales()
  {
    this.globalServicio.cargarCanalesComunic().subscribe(
      (resp:any)=>
      {
        //console.log(resp)
        this.canales = resp;
      })
  }

  //Canales de Producto Creditos
  cargarProductos()
  {
    this.creditoService.cargarProductoCredito().subscribe(
      (resp:any)=>
      {
        //console.log(resp)
        this.producto = resp;
      })
  }

 //Tabla Rango de Salarios
  cargarRangoSalario() {
    this.personaService
      .cargarRangoSalarial()
      .subscribe((resp:any) => {
        this.rangoSalario = resp;
        //console.log(this.rangoSalario)
      });
  }

   //Tabla Condiciones Laborales
  cargarCondicionLab() {
    this.personaService
      .cargarCondicionLaboral()
      .subscribe((resp:any) => {
        this.condicionLab = resp;
        //console.log(this.condicionLab)
      });
  }

  //Tabla Sector Laboral
  cargarSectorLab() {
    this.personaService
      .cargarSectorLaboral()
      .subscribe((resp:any) => {
        this.sectorLab = resp;
        //console.log(this.sectorLab)
      });
  }

  cargarSolicitudID(id:string,estado:number,cliente:string)
  {
    this.creditoService.cargarSolicitudIDCredito(id,estado,cliente)
    .subscribe((resp:any)=>
    {
      const fecha = new Date(resp[0].FECHA)
      fecha.setHours(fecha.getHours() + 6);
      let hora = fecha.toLocaleString('es-CR',{ year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric', minute: 'numeric',second:'numeric', hour12: true });
      let monto = new Intl.NumberFormat('es-ES').format(resp[0].MONTO)
      //console.log(monto)
      this.editado = true;
      this.existe = true;

      console.log(typeof resp[0].MONTO)
      this.solicitudForm .patchValue(
        {
          IDENTIFICACION:resp[0].IDENTIFICACION,
          NOMBRE:resp[0].NOMBRE,
          PRODUCTO:resp[0].PRODUCTO,
          CANAL_COM:resp[0].CANAL_COM,
          CONDICION_LAB:resp[0].CONDICION_LAB,
          SECTOR_LAB:resp[0].SECTOR_LAB,
          RANGO_SAL:resp[0].RANGO_SAL,
          ID_CLIENTE:resp[0].ID_CLIENTE,
          MONTO:resp[0].MONTO,
          OBSERVACIONES:resp[0].OBSERVACIONES,
          ID_SOLICITUD:resp[0].ID_SOLICITUD,
          FECHA:hora,
          ESTADO_ACTUAL:resp[0].ESTADO_ACT_NOM,
          EDITADO:true
        })
    })
  }

  formatoDecimal(event: any): void {
    const value = parseFloat(event.target.value);
    event.target.value = isNaN(value) ? '' : value;
  }
}
