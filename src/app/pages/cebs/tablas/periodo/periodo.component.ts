import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { periodo } from 'src/app/models/cebs/tablas.models';
import { CebsService } from 'src/app/services/cebs.service';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.scss']
})
export class PeriodoComponent implements OnInit {
  public periodo:periodo[] = [];
  public periodoForm:FormGroup

  constructor(private modalService: NgbModal, private cebsService: CebsService, private fb: FormBuilder) { 
    this.periodoForm= this.fb.group(
      {
        ID_PERIODO:['',Validators.required],
        ESTADO:['A',Validators.required],
      });
  }

  ngOnInit(): void {
    this.cargarPeriodos();
  }

   // modal Open Backdrop Disabled
   modalOpenBackdrop(modalEditUser: any) {
    this.modalService.open(modalEditUser, {
      backdrop: false,
      centered: true
    });
  }

  cargarPeriodos()
  {
    this.cebsService.cargarPeriodos()
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.periodo = resp
    })
  }

  createperiodo()
  {
    //console.log(this.periodoForm.value)
    this.cebsService.crearPeriodo(this.periodoForm.value)
    .subscribe((resp:any)=>
    {
      console.log(resp);
      if(resp.ok)
      {
        SuccessDialog.fire(
          {
            title:(resp.msg)
          });
          this.periodoForm.reset();
          this.cargarPeriodos();
      }
      else
      {
        Toast.fire({
          title:resp.msg
        })
      }
      },
      (error) => { // Si sucede un error
        Toast.fire({
          title:"Consulte al Administrador"
        })
      })
  }
  activarPeriodos(periodo:number)
  {
    this.periodoForm.patchValue({
      ESTADO: 'A',
      ID_PERIODO:periodo
    })
    //console.log(this.periodoForm.value)
    
    this.cebsService.actualizarPeriodo(this.periodoForm.value)
    .subscribe((resp:any)=>
    {
      SuccessDialog.fire(
        {
          title:(resp.msg)
        });
        this.cargarPeriodos();
      },
      (error) => { // Si sucede un error
          errorDialog.fire({
          title:error.msg
        })
      })
  }

  desactivarPeriodos(periodo:number)
  {
    this.periodoForm.patchValue({
      ESTADO: 'I',
      ID_PERIODO:periodo
    })
    
    this.cebsService.actualizarPeriodo(this.periodoForm.value)
    .subscribe((resp:any)=>
    {
      SuccessDialog.fire(
        {
          title:(resp.msg)
        });
        this.cargarPeriodos();
    },
      (error) => { // Si sucede un error
        errorDialog.fire({
        title:error.msg
      })
    })
  }

  closeModal() {
    this.periodoForm.reset();
    this.modalService.dismissAll();
  }

}
