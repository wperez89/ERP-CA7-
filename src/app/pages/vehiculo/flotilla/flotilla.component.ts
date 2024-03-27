import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { VehiculoLista } from 'src/app/models/vehiculos/tablasVehiculo.models';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-flotilla',
  templateUrl: './flotilla.component.html',
  styleUrls: ['./flotilla.component.scss']
})
export class FlotillaComponent implements OnInit {
  public flotilla:VehiculoLista[]=[];
  public flotillaTemps:VehiculoLista[] =[];
  modal: NgbModalRef;
  public vehiculoForm: FormGroup;
  public pagina: number = 1;
  public pagesize: number = 10;
  public cargando: boolean = true;
  public filtro = '';
  public tipoVeh:{ [key: string]: Object }[] = [];
  public editado: boolean = false;

  constructor(private modalService: NgbModal, private vehiculoService:VehiculoService, private fb:FormBuilder,
    private router:Router) 
  {
    this.vehiculoForm= this.fb.group(
      {
        MARCA:['',Validators.required],
        MODELO:['',Validators.required],
        ANIO:['',Validators.required],
        PLACA:['',Validators.required],
        TIPO_VEH:['',Validators.required],
        ESTADO:['',Validators.required],
        EDITADO:[],
        ID_VEHICULO:[]
      });
  }

  ngOnInit(): void {
    this.obtenerListaVehiculos();
  }

  cargarTipoVeh()
  {
    this.tipoVeh = [
      {Id:'PART',TIPO_VEH:'PARTICULAR'},
      {Id:'C',TIPO_VEH:'CARGA PESADA'},
      {Id:'CL',TIPO_VEH:'CARGA LIVIANA'},
      {Id:'EE',TIPO_VEH:'EQUIPO ESPECIAL'},
      {Id:'MOT',TIPO_VEH:'MOTOS'},
    ]
    //console.log(this.tipoVeh)
  }

  obtenerListaVehiculos()
  {
    this.vehiculoService.cargarListaVehiculos()
    .subscribe((resp:any)=>
    {
      this.flotilla = resp;
      this.flotillaTemps = resp;
    })
  }

  obtenerVehiculoID(modalEditUser: any,id:number)
  {
    this.editado = true;
    
    this.vehiculoService.cargarVehiculoID(id)
    .subscribe((resp:any)=>
    {
      var numPlaca = resp[0].PLACA.split('-')
      this.vehiculoForm.patchValue({
        ESTADO: resp[0].ESTADO,
        EDITADO:this.editado,
        MARCA:resp[0].MARCA,
        MODELO:resp[0].MODELO,
        ANIO:resp[0].ANIO,
        ID_VEHICULO:id,
        PLACA:numPlaca[1],
        TIPO_VEH:numPlaca[0]
      })
      //console.log(this.vehiculoForm.value);
    })
    this.cargarTipoVeh();
    this.modalService.open(modalEditUser, {
      backdrop: false,
      centered: true
    });
  }

  modalOpenBackdrop(modalEditUser: any) {
    this.modalService.open(modalEditUser, {
      backdrop: false,
      centered: true
    });
    this.cargarTipoVeh();
    this.vehiculoForm.patchValue({
      ESTADO: 'A',
      EDITADO:false,
    })
    //console.log(this.vehiculoForm.value)
  }

  createVehiculo()
  {
    //console.log(this.vehiculoForm.value)
    this.vehiculoService.crearVehiculoFlotilla(this.vehiculoForm.value)
    .subscribe((resp:any)=>{
    if(!resp.ok)
      if(this.vehiculoForm.invalid)
      {
        //console.error(resp)
        Toast.fire(
          {
            text:(resp.msg)
          }
        );
      }
      else{
        errorDialog.fire(
          {
            text:(resp.msg)
          }
        )
        
      }
    else
    {
      SuccessDialog.fire(
      {
        title:(resp.msg)
      });
    }
    },
    (error) => { // Si sucede un error
      errorDialog.fire(
        {
          text:(error.msg)
        }
      )
      //console.error(error);
    })
    this.vehiculoForm.reset();
    this.obtenerListaVehiculos();
  }

  filtrar()
  {
    if(this.filtro)
      {
        var filter = new RegExp(this.filtro,'i');
        this.flotilla = this.flotillaTemps.filter(item=>filter.test(item.MARCA))
      }
      else
      {
        this.flotilla = this.flotillaTemps;
      }
  }

}
