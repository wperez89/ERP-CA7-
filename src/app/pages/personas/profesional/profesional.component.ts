import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialog, Toast } from 'src/app/helpers/Notificaciones';
import { Estados, Tbl_Profesiones } from 'src/app/models/global';
import { ProfesionalesLista } from 'src/app/models/personas/persona.models';
import { GlobalService } from 'src/app/services/global.service';
import { PersonasService } from 'src/app/services/personas.service';


@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.scss']
})
export class ProfesionalComponent implements OnInit {
  public profesionales: ProfesionalesLista[] = [];
  public profesionalesTemp: ProfesionalesLista[] = [];
  public estados:Estados[];
  public professionalForm: FormGroup;
  public profesiones:Tbl_Profesiones[];
  public variable = 'A';
  public idPersona = '';
  public pagina: number = 1;
  public pagesize: number = 10;
  public filtro = '';
  public cargando: boolean = true; 

  constructor(private personaService:PersonasService, private modalService: NgbModal, private globalService:GlobalService,
    private fb:FormBuilder,private cdr: ChangeDetectorRef) 
    { 
      this.professionalForm= this.fb.group(
        {
          ID_PERSONA:['',Validators.required],
          NOMBRE:[''],
          TIPO_PROFESION:[''],
          OBSERVACIONES:[''],
        });
    }

  ngOnInit(): void {
    this.getProfesionales();
    this.cargarEstado();
    this.cargarProfesiones();
  }

  getProfesionales() {
    this.cargando = true;
    this.personaService.getListaProfesionales(this.variable)
    .subscribe((resp:any)=>
       {
        //console.log(resp.profesionales)
        this.profesionales = resp.profesionales;
        this.profesionalesTemp = resp.profesionales;
        this.cargando = false;
       })
  }

  //cargar Estado de Usuario
  cargarEstado(){
    this.globalService.cargarEstados()
    .subscribe((estados: Estados[])=>
    {
      this.estados = estados;
       //console.log(this. estado)
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

  obtenerValorEstado(value: string)
  {
      this.variable = value;
      this.cdr.detectChanges();
      this.getProfesionales();
  }

  modalOpenBackdrop(modalEditUser: any) {
  
    this.modalService.open(modalEditUser, {
      backdrop: false,
      centered: true
    });
  }

  filtrar()
  {
    if(this.filtro)
    {
      var filter = new RegExp(this.filtro,'i');
      this.profesionales = this.profesionalesTemp.filter(item=>filter.test(item.IDENTIFICACION)||filter.test(item.NOMBRE));
    }
    else
    {
      this.profesionales = this.profesionalesTemp;
    }
  }

  closeModal() {
    this.professionalForm.reset();
    this.modalService.dismissAll();
  }

  getpersonabyCedula() {
    let cedula = this.professionalForm.get('ID_PERSONA').value;
    this.personaService.getNombresPersonabyCedula(cedula)
    .subscribe((resp:any)=>
       {
        if(!resp.ok)
       {
        //console.error(resp)
        Toast.fire(
          {
            text:(resp.msg)
          }
        );
      }
      else{
        this.idPersona =resp.persona[0].ID;
        
        this.professionalForm.patchValue({
          ID_PERSONA: this.idPersona,
          NOMBRE: resp.persona[0].NOMBRE})
          }
       })
    }
  
  GuardarProfesional()
    {    
      //console.log((this.professionalForm.value)) 
    
    this.personaService.crearProfesional(this.professionalForm.value)
    .subscribe((resp:any)=>
    {
      if(!resp.ok)
      {
        Toast.fire(
          {
            text:(resp.msg)
          }
        );
      }
      else
      {
        SuccessDialog.fire(
          {
            title:(resp.msg)
          });

          this.modalService.dismissAll();
          this.professionalForm.reset();
          this.getProfesionales();
      }
    })
  }
  
  activarProfesional()
  {
    const bodyJson = { 
      idPro: this.profesionales[0].ID_PROFESIONAL
    }
    
    this.personaService.updateActiveProfesional(bodyJson)
    .subscribe((resp:any)=>
    {
      if(!resp.ok)
      {
        Toast.fire(
          {
            text:(resp.msg)
          }
        );
      }
      else
      {
        SuccessDialog.fire(
          {
            title:(resp.msg)
          });
          this.getProfesionales();
      }
    })
  }

  desactivarProfesional(id:string)
  {
    const bodyJson = { 
      idPro: this.profesionales[0].ID_PROFESIONAL
    }
    
    this.personaService.updateInactiveProfesional(bodyJson)
    .subscribe((resp:any)=>
    {
      if(!resp.ok)
      {
        Toast.fire(
          {
            text:(resp.msg)
          }
        );
      }
      else
      {
        SuccessDialog.fire(
          {
            title:(resp.msg)
          });
          this.getProfesionales();
      }
    })
  }
}
