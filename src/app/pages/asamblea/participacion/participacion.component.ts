import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { timer } from 'rxjs';
import { Toast } from 'src/app/helpers/Notificaciones';
import { participacionList, tbl_Asamblea } from 'src/app/models/asamblea/asamblea';
import { AsambleaService } from 'src/app/services/asamblea.service';

@Component({
  selector: 'app-participacion',
  templateUrl: './participacion.component.html',
  styleUrls: ['./participacion.component.scss']
})
export class ParticipacionComponent implements OnInit {
participacionForm:FormGroup;
asamblea:tbl_Asamblea[]=[];
participacion:participacionList[]=[];
asambleaid:number;
estadoAsamblea:string = '';
cargando:boolean = false;
existe:boolean = false;
pagina: number = 1;
pagesize: number = 10;

//injectables
private asambleaService=inject(AsambleaService)
private fb= inject(FormBuilder);
private modalService = inject(NgbModal);

ngOnInit(): void {
  this.cargarAsambleaActiva();
}
cargarAsambleaActiva()
{
  this.asambleaService.cargarListaAsambleas(0,'A')
  .subscribe((resp:any)=>
    {
      //console.log(resp)
      this.asamblea = resp;
      this.asambleaid = resp[0].ID_ASAMBLEA
      this.estadoAsamblea = resp[0].ESTADO
      this.cargarParticipacionPendiente()      
    })
  }

  cargarFormulario()
  {
    this.participacionForm= this.fb.group(
      {
        ID_PARTICIPACION:[''],
        ID_ASISTENCIA:['',Validators.required],
        NOMBRE:[{value:'',disabled:true},Validators.required],
        FECHA:[''],
        PALETA:['',Validators.required],
        ESTADO:[''],
        EDITADO:[false]
      });
  }

  abrirFormulario(modal:any)
  {
      this.cargarFormulario();
      this.modalService.open(modal, {
        backdrop: false,
        centered: true
      });
  }

  cargarDelegadoPaleta()
  {
    //console.log(this.participacion)
    this.cargando = true;
    let idpaleta = this.participacionForm.get("PALETA").value; 
    this.asambleaService.cargarDelegadoIDPaleta(idpaleta,this.asambleaid)
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      if(resp.length >0)
        {

          this.existe = true;
          this.participacionForm.patchValue({
            NOMBRE: resp[0].NOMBRE_COMPLETO,
            ID_ASISTENCIA:resp[0].ID_ASISTENCIA,
            ESTADO: 'P',
          });
        }
        else{
          Toast.fire({
            text:"N° de Paleta No existe"
          })
        }
        this.cargando = false;
        })
  }

  cargarParticipacionPendiente()
  {
    this.asambleaService.cargarPartcipaciones('P',this.asambleaid)
    .subscribe((resp:any)=>
    {
      this.participacion = resp;
      //console.log(this.participacion)
    })
  }

  createParticipacion(modal:any)
  {
    this.cargando =true;
    this.asambleaService.crearParticipacionDelegado(this.participacionForm.value)
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      this.cargando =false;
    })
    this.cerrarModal(modal);
  }

  cerrarModal(modal: any) {
    this.participacionForm.reset();
    this.modalService.dismissAll(modal);
    this.existe = false;
    this.cargarParticipacionPendiente();
  }

  evitarSubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  actualizarParticipacion(idPart:number,estado:string)
  {
    this.cargando =true;
    this.cargarFormulario();
    this.participacionForm.patchValue({
      ID_PARTICIPACION:idPart,
      ESTADO:estado,
      EDITADO:true
    })

    this.asambleaService.crearParticipacionDelegado(this.participacionForm.value)
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.cargarParticipacionPendiente();
      this.cargando =false;
    })
  
  }
}
