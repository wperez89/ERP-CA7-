import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { Estados } from 'src/app/models/global';
import { aprobadoresSolVeh } from 'src/app/models/vehiculos/tablasVehiculo.models';
import { GlobalService } from 'src/app/services/global.service';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-aprobador',
  templateUrl: './aprobador.component.html',
  styleUrls: ['./aprobador.component.scss']
})
export class AprobadorComponent implements OnInit {
  aprobador:aprobadoresSolVeh[] = [];
  aprobadorTemp:aprobadoresSolVeh[] = [];
  estados:Estados[];
  aprobadorForm:FormGroup;
  modal: NgbModalRef;
  public pagina: number = 1;
  public pagesize: number = 10;
  public cargando: boolean = true;
  public filtro = '';
  public id = '';
  public variable = 'A';
  public editado = false;
  public 

  constructor(private modalService: NgbModal,private vehiculoService:VehiculoService, private fb:FormBuilder,
    private personaService:PersonasService, private usuarioService:UsuarioService, private globalService: GlobalService) {
    this.aprobadorForm= this.fb.group(
      {
        ID:['',Validators.required],
        APROBADOR:['',Validators.required],
        NOMBRE:['',Validators.required],
        ESTADO:['A',Validators.required],
        EDITADO:[false],
        ID_APROBADOR:['']
      });
  }

  ngOnInit(): void {
    this.cargarEstado();
    this.cargarAprobadores();
  }
  
  cargarEstado()
  {
    this.globalService.cargarEstados()
    
    .subscribe((estados: Estados[])=>
    {
      this.estados = estados;
    })
  }

  obtenerValorEstado(value: string)
  {
    this.variable = value;
    this.cargarAprobadores();
  }


  cargarAprobadores()
  {
    this.cargando;
    this.vehiculoService.cargarAprobadores(this.variable)
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.aprobador = resp;
      this.cargando = false;
    })
  }

  cargarAprobadorID(modal:any, id:number)
  {
    this.editado = true;

    this.vehiculoService.cargarAprobadorID(id)
    .subscribe((resp:any)=>
    {

      this.aprobadorForm.patchValue({
        ID_APROBADOR:resp[0].ID_APROBADOR,
        APROBADOR:resp[0].APROBADOR,
        ID:resp[0].IDENTIFICACION,
        NOMBRE: resp[0].NOMBRE,
        ESTADO:resp[0].ESTADO,
        EDITADO: true,
      })
      this.id = resp[0].IDENTIFICACION;
      this.modalOpenBackdrop(modal);
    
    })
  }

  modalOpenBackdrop(modal: any) {
    this.modalService.open(modal, {
      backdrop: false,
      centered: true
    });
  
  }

  cerrarModal(modal:any)
  {
    this.aprobadorForm.reset();
    this.modalService.dismissAll(modal);
    this.id = '';
    this.variable = 'A';
    this.editado = false;
    this.cargarAprobadores();
  }

  createAprobador(modal: any)
  {
    //console.log(this.aprobadorForm.value);
    this.vehiculoService.crearAprobador(this.aprobadorForm.value)
    .subscribe((resp:any)=>
    {
      if(!this.editado)
      {
        if(this.aprobadorForm.invalid)
      {
        Toast.fire(
          {
            text:"Complete Todos los Campos"
          }
        );
        return
      }
      }
      if(!resp.ok)
      {
        errorDialog.fire(
          {
            text:(resp.msg)
          }
        );
        this.cerrarModal(modal);
      }
      else
      {
        SuccessDialog.fire(
          {
            text:(resp.msg)
          }
        )
        this.cerrarModal(modal);
      }
    },
    (error) => { // Si sucede un error
      errorDialog.fire(
        {
          text:(error.msg)
        }
        )
        this.cerrarModal(modal);
      }
      )
      
  }

  filtrar()
  {
    if(this.filtro)
      {
        var filter = new RegExp(this.filtro,'i');
        this.aprobador = this.aprobadorTemp.filter(x=>filter.test(x.NOMBRE)||filter.test(x.CEDULA))
      }
      else
      {
        this.aprobador = this.aprobadorTemp;
      }
  }

  mostrarPersona()
  {
    this.cargando;
    this.id = this.aprobadorForm.get("ID").value;
    //console.log()
    this.usuarioService.getUserCedula(this.id)
    .subscribe((resp:any)=>
    {
      //console.log(resp[0]);
      
      this.aprobadorForm.patchValue({
        NOMBRE:resp[0].NOMBRE,
        APROBADOR:resp[0].ID_USUARIO,
        ESTADO:'A'
      })
      
      this.cargando = false;
    }
    )
  }

  evitarSubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

}
