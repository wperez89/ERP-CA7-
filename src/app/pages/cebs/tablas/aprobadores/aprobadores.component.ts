import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { aprobacion } from 'src/app/models/cebs/tablas.models';
import { CebsService } from 'src/app/services/cebs.service';

@Component({
  selector: 'app-aprobadores',
  templateUrl: './aprobadores.component.html',
  styleUrls: ['./aprobadores.component.scss']
})
export class AprobadoresComponent implements OnInit {
  public aprobador: aprobacion[]= [];
  public aprobadorForm:FormGroup;
  public edit:boolean = false;

  constructor(private modalService: NgbModal, private cebsServices:CebsService, private fb:FormBuilder) {
    this.aprobadorForm= this.fb.group(
      {
        ID_APROBADOR:[''],
        APROBADOR:['',Validators.required],
        ESTADO:['A'],
      });
   }

  ngOnInit(): void {
    this.cargarAprobadores();
  }

   // modal Open Backdrop Disabled
   modalOpenBackdrop(modalEditUser: any) {
    this.modalService.open(modalEditUser, {
      backdrop: false,
      centered: true
    });

  }

  // modal Open Backdrop Disabled
  modalEdit(modal: any, id:number, nombre:string) {
    this.modalService.open(modal, {
      backdrop: false,
      centered: true
    });
    this.aprobadorForm.patchValue({
      ID_APROBADOR:id,
      APROBADOR:nombre,
      ESTADO:'A',
    })
    this.edit = true;
  }

  cargarAprobadores()
  {
    this.cebsServices.cargarAprobadores()
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      this.aprobador = resp;
    })
  }

   closeModal() {
    this.aprobadorForm.reset();
    this.modalService.dismissAll();
  }

  createAprobador()
  {
    if(this.aprobadorForm.invalid)
    {
      return
    }
    else
    {
      if(!this.edit)
      {
        //console.log(this.aprobadorForm.value)
    this.cebsServices.crearAprobadores(this.aprobadorForm.value)
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      if(resp.ok)
      {
        SuccessDialog.fire({
          title:resp.msg
        }
        )
        this.aprobadorForm.reset;
        this.cargarAprobadores();
      }
      else
      {
        Toast.fire({
          title:resp.msg
        }
        )
        this.aprobadorForm.reset;
      }
    })
      }
      else
      {
        this.cebsServices.actualizarAprobadores(this.aprobadorForm.value)
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      if(resp.ok)
      {
        SuccessDialog.fire({
          title:resp.msg
        }
        )
        this.aprobadorForm.reset;
        this.cargarAprobadores();
        this.edit = false;
      }
      else
      {
        Toast.fire({
          title:resp.msg
        }
        )
        this.aprobadorForm.reset;
        this.edit = false;
      }
    })
      }
    }
    
  }

  activarAprobador(aprobador:number, nombre:string)
  {
    this.aprobadorForm.patchValue({
      ESTADO: 'A',
      ID_APROBADOR:aprobador,
      APROBADOR: nombre
    })
    //console.log(this.periodoForm.value)
    
    this.cebsServices.actualizarAprobadores(this.aprobadorForm.value)
    .subscribe((resp:any)=>
    {
      SuccessDialog.fire(
        {
          title:(resp.msg)
        });
        this.cargarAprobadores();
      },
      (error) => { // Si sucede un error
          errorDialog.fire({
          title:error.msg
        })
      })
  }

  desactivarAprobador(aprobador:number,nombre:string)
  {
    this.aprobadorForm.patchValue({
      ESTADO: 'I',
      ID_APROBADOR:aprobador,
      APROBADOR: nombre
    })
    
    this.cebsServices.actualizarAprobadores(this.aprobadorForm.value)
    .subscribe((resp:any)=>
    {
      SuccessDialog.fire(
        {
          title:(resp.msg)
        });
        this.cargarAprobadores();
    },
      (error) => { // Si sucede un error
        errorDialog.fire({
        title:error.msg
      })
    })
  }

}
