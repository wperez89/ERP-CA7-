import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { beneficios } from 'src/app/models/cebs/tablas.models';
import { CebsService } from 'src/app/services/cebs.service';

@Component({
  selector: 'app-beneficios',
  templateUrl: './beneficios.component.html',
  styleUrls: ['./beneficios.component.scss']
})
export class BeneficiosComponent implements OnInit {
  public beneficios:beneficios[] =[];
  public beneficioForm: FormGroup;
  public edit:boolean = false;

  constructor(private modalService:NgbModal,private fb:FormBuilder, private cebsServices:CebsService) {
    this.beneficioForm= this.fb.group(
      {
        ID_BENEFICIO:[],
        BENEFICIO:['',Validators.required],
        OBSERVACION:[''],
        ESTADO:['A'],
      });
   }

  ngOnInit(): void {
    this.cargarBeneficios();
  }

  // modal Open Backdrop Disabled
  modalOpenBackdrop(modalEditUser: any) 
  {
    this.modalService.open(modalEditUser, {
      backdrop: false,
      centered: true
    });
  }

   // modal Open Backdrop Disabled
   modalEdit(modal: any, id:number, nombre:string, observacion:string) {
    this.modalService.open(modal, {
      backdrop: false,
      centered: true
    });
    this.beneficioForm.patchValue({
      ID_BENEFICIO:id,
      BENEFICIO:nombre,
      OBSERVACION:observacion,
      ESTADO:'A',
    })
    this.edit = true;
  }

  closeModal() {
    this.beneficioForm.reset();
    this.modalService.dismissAll();
  }

  cargarBeneficios()
  {
    this.cebsServices.cargarBeneficios()
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      this.beneficios = resp;
    })
  }

  createBeneficio()
  {
    if(this.beneficioForm.invalid)
    {
      Toast.fire({
        title:"Complete todos los campos"
      })
      return
    }
    else
    {
      if(!this.edit)
      {
        //console.log(this.aprobadorForm.value)
    this.cebsServices.crearBeneficios(this.beneficioForm.value)
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      if(resp.ok)
      {
        SuccessDialog.fire({
          title:resp.msg
        }
        )
        this.resetearform()
      }
      else
      {
        Toast.fire({
          title:resp.msg
        }
        )
        this.resetearform()
      }
    })
      }
      else
      {
        this.cebsServices.actualizarBeneficios(this.beneficioForm.value)
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      if(resp.ok)
      {
        SuccessDialog.fire({
          title:resp.msg
        }
        )
        this.resetearform()
      }
      else
      {
        Toast.fire({
          title:resp.msg
        }
        )
        this.resetearform()
      }
    })
      }
    }
    
  }

  activarBeneficio(id:number, nombre:string, observ:string)
  {
    this.beneficioForm.patchValue({
      ID_BENEFICIO:id,
      BENEFICIO:nombre,
      OBSERVACION:observ,
      ESTADO:'A',
    })
    //console.log(this.periodoForm.value)
    
    this.cebsServices.actualizarBeneficios(this.beneficioForm.value)
    .subscribe((resp:any)=>
    {
      SuccessDialog.fire(
        {
          title:(resp.msg)
        });
        this.cargarBeneficios();
      },
      (error) => { // Si sucede un error
          errorDialog.fire({
          title:error.msg
        })
      })
  }

  desactivarBeneficio(id:number, nombre:string, observ:string)
  {
    this.beneficioForm.patchValue({
      ID_BENEFICIO:id,
      BENEFICIO:nombre,
      OBSERVACION:observ,
      ESTADO:'I',
    })
    
    this.cebsServices.actualizarBeneficios(this.beneficioForm.value)
    .subscribe((resp:any)=>
    {
      SuccessDialog.fire(
        {
          title:(resp.msg)
        });
        this.cargarBeneficios();
    },
      (error) => { // Si sucede un error
        errorDialog.fire({
        title:error.msg
      })
    })
  }

  resetearform()
  {
    this.beneficioForm.reset();
    this.edit = false;
    this.cargarBeneficios();
    window.location.reload();
  }
}
