import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialog, Toast, errorDialog, showConfirmationAlert } from 'src/app/helpers/Notificaciones';
import { cargarNombrePersona } from 'src/app/interfaces/cargar-personas.interface';
import { Usuario } from 'src/app/models/User/usuario.models';
import { AvaluoLista } from 'src/app/models/avaluos/avaluo.models';
import { Estados } from 'src/app/models/global';
import { nombresPersona } from 'src/app/models/personas/persona.models';
import { AvaluoService } from 'src/app/services/avaluo.service';
import { GlobalService } from 'src/app/services/global.service';
import { PersonasService } from 'src/app/services/personas.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VerticalSidebarService } from 'src/app/shared/vertical-sidebar/vertical-sidebar.service';

@Component({
  selector: 'app-avaluos',
  templateUrl: './avaluos.component.html',
  styleUrls: ['./avaluos.component.scss']
})
export class AvaluosComponent implements OnInit {
  public avaluo: AvaluoLista[] = [];
  public avaluoTemp: AvaluoLista[] = [];
  public estados:Estados[];
  public usuario: Usuario;
  public persona: nombresPersona;
  public variable = 'A';
  public idPersona = '';
  public pagina: number = 1;
  public pagesize: number = 10;
  public filtro = '';
  modal: NgbModalRef;
  public AddAvaluoForm: FormGroup;
  public cargando: boolean = true;
  
  constructor(private avaluoService:AvaluoService, private globalService: GlobalService, private modalService: NgbModal,
    private fb:FormBuilder, private usuarioservice:UsuarioService, private personaservice:PersonasService,
    private router: Router, private menu:VerticalSidebarService) { 
      this.usuario = usuarioservice.usuario;
      this.AddAvaluoForm= this.fb.group(
        {
          ID_CLIENTE:['',Validators.required],
          CREATED:[''],
          NOMBRE:[''],
        });
    }

  ngOnInit(): void {
    this.menu.items;
    this.getAvaluos();
    this.cargarEstado();
    
  }

  getAvaluos() {
    this.cargando = true;
    this.avaluoService.cargarListaAvaluos(this.variable)
    .subscribe(({avaluos})=>
       {    
        this.avaluo = avaluos;
        this.avaluoTemp = avaluos;
        this.cargando = false;
       })
       this.router.navigateByUrl(`/avaluo`)
  }

  //cargar Estado de Usuario
  cargarEstado()
  {
    this.globalService.cargarEstados()
    
    .subscribe((estados: Estados[])=>
    {
      this.estados = estados;
      //console.log(this. estado)
    })
  }

  obtenerValorEstado(value: string)
  {
    this.variable = value;
    this.getAvaluos();
  }

  filtrar()
  {
    if(this.filtro)
    {
      var filter = new RegExp(this.filtro,'i');
      this.avaluo = this.avaluoTemp.filter(item=>filter.test(item.IDENTIFICACION)||filter.test(item.NOMBRE));
    }
    else
    {
      this.avaluo = this.avaluoTemp;
    }
  }

  modalOpenBackdrop(modalEditUser: any) {
    this.modalService.open(modalEditUser, {
      backdrop: false,
      centered: true
    });
  }

  closeModal() {
    this.idPersona = '';
    this.AddAvaluoForm.reset();
    this.modalService.dismissAll();
  }

  getpersonabyCedula() {
    let cedula = this.AddAvaluoForm.get('ID_CLIENTE').value;
    this.personaservice.getNombresPersonabyCedula(cedula)
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
        
        this.AddAvaluoForm.patchValue({
          ID_CLIENTE: this.idPersona,
          NOMBRE: resp.persona[0].NOMBRE,
          CREATED: this.usuario.EMAIL})
          }
       })
    }

  GuardarAvaluo()
    {     
    this.avaluoService.crearRegistroAvaluo(this.AddAvaluoForm.value)
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

          this.closeModal();
          this.AddAvaluoForm.reset();
          this.getAvaluos();
      }
    })
  }

  anularAvaluo(id:string)
  {
    const title = 'Estás Seguro de Anular el siguiente Avalúo:'
      const text = id
      showConfirmationAlert(title,text,"Anular").then((result) => 
      {
        console.log(result)
        if (!result.isConfirmed) 
        {
          this.getAvaluos();
        }
        else 
        {
          this.avaluoService.anularAvaluo(id).subscribe((resp:any)=>
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
            this.getAvaluos();
          }
          })
        }
      })
  }
}

