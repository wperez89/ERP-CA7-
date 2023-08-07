import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CotizacionComponent } from '../cotizacion/cotizacion.component';
import { GlobalService } from 'src/app/services/global.service';
import { PersonasService } from 'src/app/services/personas.service';
import { ActivatedRoute } from '@angular/router';
import { AvaluoService } from 'src/app/services/avaluo.service';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss']
})
export class FacturaComponent implements OnInit {
  public cotizacionComponent: CotizacionComponent;
  public factAvaluoForm: FormGroup;
  public profesion: any;
  public profesional: any;
  public profesionalLista:any;
  public facturas:[] =[]
  public mtdoPago:any;
  public entidades:any;
  public id_avaluo: string = '';
  public id_fact: string = '';
  public tipo_fact: string = '';
  public variable_prof: number;
  public metodo: number= 0;
  public existe:boolean = false;
  public archivoLength: boolean = false;
  public archivoSelected : File;
  
  constructor(private fb: FormBuilder,private globalService: GlobalService, private personaService:PersonasService,
    private activatedRoute:ActivatedRoute, private avaluoService:AvaluoService) {
    this.factAvaluoForm= this.fb.group(
      {
        ID_FACTURA:[''],
        TIPO_CTZCN:['',Validators.required],
        PROFESIONAL_ID:['',Validators.required],
        NUM_FACTURA:['',Validators.required],
        FECHA_PAGO:['',Validators.required],
        MONTO:['',Validators.required],
        METODO_PAGO:['',Validators.required],
        BANCO:[''],
        NUM_DEPOSITO:[''],
        REFERENCIA_FACT:[''],
        OBSERVACIONES:[''],
        DOC:[null]
      });
   }

  ngOnInit(): void {
    this.id_avaluo = this.activatedRoute.snapshot.params['id'];
    this.CargarProfesiones();
    this.cargarMetodoPago();
    this.CargarListaFacturas(this.id_avaluo)
  }

  CargarProfesiones()
  {
    this.globalService.cargarProfesiones().subscribe((resp: any) => {
      this.profesion = resp;
    })
  }

  listaProfesionales(id:string)
  {
    this.personaService.getProfesionalID(id).subscribe((resp: any) => {
      this.profesional = resp;
    })
  }

  cargarProfesionales(value:number) {
    this.personaService.getListaProf_Tipo(value)
    .subscribe((resp:any)=>
       {
        this.profesional = resp;
        //console.log(this.profesional)
       })
  }
  
  changetipoProfesional(value:number)
  {
    console.log(value)
    this.variable_prof = value;
    this.cargarProfesionales(this.variable_prof)
  }

  cargarMetodoPago()
  {
    this.globalService.cargarMetodoPago().subscribe((resp: any) => {
      this.mtdoPago = resp.metodo;
    })
  }

  changeMetodoPago(value:number)
  {
    this.metodo = value;
    this.cargarEntidadesFinancieras();
  }

  cargarEntidadesFinancieras()
  {
    this.globalService.cargarEntidadesFinancieras().subscribe((resp: any) => {
      this.entidades = resp.entidad;
    })
  }

  CargarListaFacturas(id:string)
  {
    this.avaluoService.cargarFacturaLista(id).subscribe((resp: any) => {
      this.facturas = resp;
      //console.log(resp)
    })
  }

  cargarFacturaID(id:string, fact:string)
  {
    this.factAvaluoForm.reset();
    this.cargarEntidadesFinancieras();
    this.avaluoService.cargarFacturaID(id,fact).subscribe((resp: any) => {
      //console.log(resp)
      this.factAvaluoForm.patchValue({
        ID_FACTURA:resp.ID_FACTURA,
        TIPO_CTZCN:resp.ID_PROFESION,
        PROFESIONAL_ID:resp.PROFESIONAL_ID,
        NUM_FACTURA:resp.NUM_FACTURA,
        FECHA_PAGO:resp.FECHA_PAGO,
        MONTO:resp.MONTO,
        METODO_PAGO:resp.METODO_PAGO,
        BANCO:resp.BANCO,
        NUM_DEPOSITO:resp.NUM_DEPOSITO,
        REFERENCIA_FACT:resp.REFERENCIA_FACT,
        OBSERVACIONES:resp.OBSERVACIONES
      })
      this.listaProfesionales(resp.PROFESIONAL_ID);
      this.metodo = resp.METODO_PAGO
      this.existe = true;
      this.id_fact = resp.ID_FACTURA;
      this.tipo_fact = resp.PROFESION
    })
  }


  guardarFactura()
  {
    this.factAvaluoForm.patchValue({
      REFERENCIA_FACT:this.id_avaluo
    });
    console.log(this.factAvaluoForm.value);
    if(!this.existe)
    {
      this.avaluoService.crearFactAvaluo(this.factAvaluoForm.value).subscribe(
        (resp)=>{
          console.log(resp)
          if(!resp.ok)
          {
            if(this.factAvaluoForm.invalid)
            {
              Toast.fire(
                {
                  text:(resp.msg)
                }
              );
            }
            else
            {
              errorDialog.fire(
                {
                  text:(resp.msg)
                }
                )
            }
          }
          else
          {
            SuccessDialog.fire(
              {
                title:(resp.msg)
              });
              this.factAvaluoForm.reset();
              this.CargarListaFacturas(this.id_avaluo);
              this.existe = false;
            }
        },
        (err) => { // Si sucede un error
          console.log(err)
          errorDialog.fire({
            title:err.error.msg
          })
        })   
    }
    else
    {
      this.avaluoService.updateFactAvaluo(this.factAvaluoForm.value).subscribe(
        (resp)=>{
          console.log(resp)
          if(!resp.ok)
          {
            if(this.factAvaluoForm.invalid)
            {
              Toast.fire(
                {
                  text:(resp.msg)
                }
              );
            }
            else
            {
              errorDialog.fire(
                {
                  text:(resp.msg)
                }
                )
            }
          }
          else
          {
            SuccessDialog.fire(
              {
                title:(resp.msg)
              });
              console.log(this.factAvaluoForm.value);
              this.factAvaluoForm.reset();
              this.CargarListaFacturas(this.id_avaluo);
              this.existe = false;
            }
        },
        (err) => { // Si sucede un error
          console.log(err)
          errorDialog.fire({
            title:err.error.msg
          })
        })   
    } 
    }

  checkFileInput(event:any) {
    if (event.target.files && event.target.files.length > 0) 
    {
        this.archivoLength = true
        this.archivoSelected = event.target.files[0];
    }
    else 
    {
      this.archivoLength = false
    }
  }
  uploadFactura()
  {
    this.avaluoService.uploadFactura(this.id_fact,this.archivoSelected,this.tipo_fact).subscribe(
      (resp)=>
      {
        //console.log(resp)
        if(!resp.ok)
        {
          Toast.fire(
            {
              text:(resp.msg)
            }
          )
        }
        else{
          SuccessDialog.fire(
            {
              text:(resp.msg)
            }
          );
          this.factAvaluoForm.reset();
          this.existe = false;
        }
      },
      (err) =>
      {
        //console.log(err)
        errorDialog.fire({
          title:err.error.msg
        })  
      }
    )
  }
}
