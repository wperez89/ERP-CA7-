import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialog, Toast } from 'src/app/helpers/Notificaciones';
import { conductor } from 'src/app/models/vehiculos/tablasVehiculo.models';
import { AvaluoService } from 'src/app/services/avaluo.service';
import { PersonasService } from 'src/app/services/personas.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-chofer',
  templateUrl: './chofer.component.html',
  styleUrls: ['./chofer.component.scss']
})
export class ChoferComponent implements OnInit {
  public chofer:conductor[]=[];
  public choferTemp:conductor[] =[];
  public tipoLic:[]=[];
  modal: NgbModalRef;
  public conductorForm: FormGroup;
  public pagina: number = 1;
  public pagesize: number = 10;
  public cargando: boolean = true;
  public filtro = '';
  public id = '';
  public editado:boolean = false;
  public archivoLength: boolean = false;
  public archivoSelected : File;
  public docSelected:number = 1;
  public document:string = '';
  
  constructor(private modalService: NgbModal,private fb:FormBuilder, private personaService:PersonasService,
    private vehiculoService:VehiculoService, private avaluoService:AvaluoService) {
    this.conductorForm = this.fb.group({
      ID_CONDUCTOR:[''],
      ID_PERSONA:['',Validators.required],
      EXPEDICION:['',Validators.required],
      VENCIMIENTO:['',Validators.required],
      TIPO_LIC:['',Validators.required],
      OBSERVACION:[''],
      EDITADO:[''],
      IMG:['',Validators.required],
      ESTADO:['',Validators.required],
      ID:['',Validators.required],
      NOMBRE:['',Validators.required],
    })
   }

  ngOnInit(): void {
    this.cargarConductores();
  }

  cargarConductores()
  {
    //console.log(this.editado)
    this.cargando = true;
    this.vehiculoService.cargarChofer()
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.chofer = resp;
      this.choferTemp = resp;
    })
    this.cargando = false;
  }

  cargarTipoLicencias()
  {
    this.vehiculoService.cargarTipoLicencias()
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.tipoLic = resp;
    })
  }

  createDriver(modalEdit: any)
  {
    if(this.editado)
    {
      this.conductorForm.get('IMG').clearValidators();
      this.conductorForm.get('IMG').updateValueAndValidity();
    }
    //console.log(this.conductorForm.value);
    //console.log(this.archivoSelected)
    if(this.conductorForm.invalid)
    { 
      Toast.fire(
        {
          text:('Completar Información del Formulario')
        }
      )
      return
    }
    //console.log(this.documentDigitalForm.value)
    this.vehiculoService.crearConductor(this.conductorForm.value,this.archivoSelected, this.editado)
    .subscribe((resp:any)=>
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
        else
        {
          SuccessDialog.fire(
            {
              text:resp.msg
            }
          )
          this.conductorForm.reset();
          this.id = '';
          this.cerrarModal(modalEdit);
          this.cargarConductores();
        }
      }
    )
  }

  obtenerLicenciaID(modalEditUser: any,idDriver:number)
  {
    this.cargando = true;
    this.cargarTipoLicencias();
    this.editado = true;
    this.vehiculoService.cargarChoferID(idDriver)
    .subscribe((resp:any)=>
    {
      this.conductorForm.patchValue({
        ESTADO: resp[0].ESTADO,
        EDITADO:this.editado,
        NOMBRE:resp[0].NOMBRE,
        EXPEDICION:resp[0].EXPEDICION,
        VENCIMIENTO:resp[0].VENCIMIENTO,
        ID_PERSONA:resp[0].ID_PERSONA,
        TIPO_LIC:resp[0].TIPO_LIC,
        ID_CONDUCTOR:idDriver,
        OBSERVACION:resp[0].OBSERVACION,
        ID:resp[0].ID
      })
      this.id = resp[0].ID;
      this.document = resp[0].IMG;
      //console.log(this.document)
      //console.log(this.conductorForm.value);
      this.cargando = false;
    })
    
    this.modalService.open(modalEditUser, {
      backdrop: false,
      centered: true
    });
  }

  modalOpenBackdrop(modalEdit: any) {
    this.cargarTipoLicencias();
    this.modalService.open(modalEdit, {
      backdrop: false,
      centered: true,
      //fullscreen:true
      size:'xl'
    });
  }

  cerrarModal(modalEdit:any)
  {
    this.conductorForm.reset();
    this.modalService.dismissAll(modalEdit);
    this.id = '';
    this.document ='';
    this.editado = false;
  }

  mostrarPersona()
  {
    this.id = this.conductorForm.get("ID").value;
    //console.log()
    this.personaService.getNombresPersonabyCedula(this.id)
    .subscribe((resp:any)=>
    {
      //console.log(resp.persona[0]);
      this.conductorForm.patchValue({
        NOMBRE:resp.persona[0].NOMBRE,
        ID_PERSONA:resp.persona[0].ID,
        ESTADO:'A'
      })
    }
    )
  }

  checkFileInput(event:any) {
    if (event.target.files && event.target.files.length > 0) 
    {
        this.archivoLength = true
        this.archivoSelected = event.target.files[0];
        //console.log(this.archivoSelected)
    }
    else 
    {
      this.archivoLength = false
    }
  }

  filtrar()
  {
    if(this.filtro)
      {
        var filter = new RegExp(this.filtro,'i');
        this.chofer = this.choferTemp.filter(item=>filter.test(item.ID_PERSONA))
      }
      else
      {
        this.chofer = this.choferTemp;
      }
  }

  evitarSubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  downloadfile()
  {
    const nombreArchivo = this.document;
    this.avaluoService.downloadFile(nombreArchivo,'vehiculos')
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

}
