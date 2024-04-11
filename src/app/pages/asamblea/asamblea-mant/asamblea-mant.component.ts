import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { errorDialog, SuccessDialog, Toast } from 'src/app/helpers/Notificaciones';
import { tbl_Asamblea } from 'src/app/models/asamblea/asamblea';
import { AsambleaService } from 'src/app/services/asamblea.service';

@Component({
  selector: 'app-asamblea-mant',
  templateUrl: './asamblea-mant.component.html',
  styleUrls: ['./asamblea-mant.component.scss']
})



export class AsambleaMantComponent implements OnInit{
  
  asamblea:tbl_Asamblea[]=[];
  asambleaTemp:tbl_Asamblea[]=[];
  asambleaTblForm:FormGroup;
  pagina: number = 1;
  pagesize: number = 10;
  estadoSelected:string = 'A';
  filtro = '';
  editado:boolean = false;

  private asambleaService = inject(AsambleaService)
  private fb = inject(FormBuilder);
  private modalService = inject(NgbModal)
  
  ngOnInit(): void {
    this.cargarAsamblea();
  }

  cargarAsamblea()
  {
    this.asambleaService.cargarListaAsambleas(0,this.estadoSelected)
    .subscribe((resp:any)=>{
      //console.log(resp)
      this.asamblea = resp;
      this.asambleaTemp = resp;
    })
  }

  changeEstado(id:any)
  {
    this.estadoSelected = id;
    this.cargarAsamblea();
  }

  cargarFormulario()
  {
    this.asambleaTblForm= this.fb.group(
      {
        ID_ASAMBLEA:[''],
        DETALLE:['',Validators.required],
        CSC_ASISTENCIA:['',Validators.required],
        PERIODO:['',Validators.required],
        ESTADO:[''],
        EDITADO:['']
      });
  }

  abrirFormulario(modal:any)
  {
      this.cargarFormulario();
      this.modalService.open(modal, {
        backdrop: false,
        centered: true
      });
      if(!this.editado)
      {
        this.asambleaTblForm.patchValue({
          ESTADO: 'A',
          CSC_ASISTENCIA:1,
          EDITADO:false,
        })
      }
  }

  createAsamblea()
  {
    //console.log(this.asambleaTblForm.value)
    if(this.asambleaTblForm.invalid)
    {
      Toast.fire({
        text:'Complete los campos del Formulario'
      }
      )
      return
    }

    this.asambleaService.crearAsamblea(this.asambleaTblForm.value)
    .subscribe((resp:any)=>
    {
      if(resp.ok)
      {
        SuccessDialog.fire({
          title:'Enhorabuena',
          text:resp.msg
        })
      }
      else
      {
        errorDialog.fire({
          title:'Hubo un Problema',
          text:resp.msg
        })
      }
      this.asambleaTblForm.reset();
      this.cargarAsamblea();
    })
  }

  obtenerAsambleaID(modal: any,id:number)
  {
    this.cargarFormulario();
    this.editado = true;
    this.asambleaService.cargarListaAsambleas(id,'N')
    .subscribe((resp:any)=>{
      this.asambleaTblForm.patchValue({
        ESTADO: resp[0].ESTADO,
        CSC_ASISTENCIA:resp[0].CSC_ASISTENCIA,
        DETALLE:resp[0].DETALLE,
        PERIODO:resp[0].PERIODO,
        ID_ASAMBLEA:resp[0].ID_ASAMBLEA,
        EDITADO:true
      });
      this.modalService.open(modal, {
        backdrop: false,
        centered: true
      });
    })
  }

  filtrar()
  {
    if(this.filtro)
    {
      var filter = new RegExp(this.filtro,'i');
      this.asamblea = this.asambleaTemp.filter(item=>filter.test(item.DETALLE)||filter.test(item.PERIODO.toString()));
    }
    else
    {
      this.asamblea = this.asambleaTemp;
    }
  }
}
