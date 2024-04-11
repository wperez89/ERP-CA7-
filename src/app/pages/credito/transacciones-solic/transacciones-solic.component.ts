import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Confirmation, SuccessDialog, Toast } from 'src/app/helpers/Notificaciones';
import { Usuario } from 'src/app/models/User/usuario.models';
import { ArchivosSolicitudCred } from 'src/app/models/credito/credito.models';
import { ArchivoDigitalService } from 'src/app/services/archivo-digital.service';
import { CreditoService } from 'src/app/services/credito.service';
import { CryptoService } from 'src/app/services/crypto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-transacciones-solic',
  templateUrl: './transacciones-solic.component.html',
  styleUrls: ['./transacciones-solic.component.scss']
})

export class TransaccionesSolicComponent {
  trscnSolCredForm: FormGroup;
  cargando:boolean = false;
  transaccion: [] = [];
  estados: [] = [];
  analista:[]=[];
  estadoAnt:string = '';
  idSolicitud:string = '';
  editado: boolean = false;
  usuario:Usuario;
  id:string = '';
  asignado:string='';
  estadoSelected:number = 0;
  idCrypt = '';
  clienteCrypt = ''
  tipoCrypt = '';
  asignadoCrypt = '';
  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

  constructor( private activatedRoute:ActivatedRoute, private cryptService:CryptoService, private modalService:NgbModal,
     private creditoService:CreditoService, private fb:FormBuilder, private usuarioService:UsuarioService,
     private archivoService:ArchivoDigitalService, private router:Router ) 
  {
    this.trscnSolCredForm = this.fb.group({
      ID_TRAN: [""],
      NUM_SOLICITUD: ["",Validators.required],
      NOM_USER: [""],
      ESTADO_ACT: ["", Validators.required],
      ESTADO_ANT: ["", Validators.required],
      DETALLE: ["", Validators.required],
      USUARIO: ["", Validators.required],
      ANALISTA:[""],
      ASIGNADO:[""],
      FECHA: [""],
      EDITADO: [false]
    });
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>
    {
      if(params['id'])
      {
        this.idCrypt = params['id'];
        this.clienteCrypt = params['cliente'];
        this.tipoCrypt = params['tipo'];
        this.asignadoCrypt = params['asignado'];
        this.idSolicitud = this.cryptService.decrypt(params['id']) ;
        this.estadoAnt = params['estado'];
        this.asignado = this.cryptService.decrypt(params['asignado']);
        this.cargarTransaccionesSolicitud(this.idSolicitud);
      }
    })
  }


  cargarTransaccionesSolicitud(id:string)
  {
    this.creditoService.cargarTrnscSolicCredito(id)
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      this.transaccion =resp.allTransc;
    })
  }

  createtrscnSol(modal:any)
  {
    this.trscnSolCredForm.patchValue({
      NUM_SOLICITUD:this.idSolicitud,
      ESTADO_ANT:this.estadoAnt,
      USUARIO:this.usuario.ID_USUARIO,
      ASIGNADO:this.asignado
    })
    //console.log(this.trscnSolCredForm.value)
    if(this.asignado === this.trscnSolCredForm.get('ANALISTA').value)
    {
      Toast.fire({
        text:"El Analista Asignado Corresponde al Actual, favor asignar otro Analista."
      })
      return
    }
    if(this.estadoAnt === '6' && this.trscnSolCredForm.get('ESTADO_ACT').value === '6')
    {
      Toast.fire({
        text:"La Solicitud se encuentra en Estado ReAsignado. Pongase en Contacto con el Administrador."
      })
      return
    }
    const formValue = this.trscnSolCredForm.value;
        
    this.creditoService.crearTransaccion(this.trscnSolCredForm.value)
    .subscribe((resp:any)=>
    {
      if(resp.ok)
      {
        //console.log(resp);
        const estAct = this.trscnSolCredForm.get('ESTADO_ACT').value;
        this.cerrarModal(modal);
        this.router.navigate([`//credito/solicitud/edit/${this.idCrypt}/${estAct}/${this.clienteCrypt}`]) 
        //this.router.navigate([`//credito/transacciones/${this.clienteCrypt}/${estAct}/${this.idCrypt}/${this.tipoCrypt}/${this.asignadoCrypt}`])
        this.trscnSolCredForm.reset();
      SuccessDialog.fire({
        text:resp.msg
      })
      }
    },error=>{
      Toast.fire(
        {
          text:'Consulte al Administrador'
        }
      )
    })
  }

  mostrarTransaccionesID(modal:any,id:number)
  {
    this.editado = true;
    this.creditoService.cargarTrnscSolicCreditoID(id)
    .subscribe((resp:any)=>
    {
      //console.log(resp[0])
      this.id = resp[0].ID_TRANSACCION;
      let fecha = new Date(resp[0].FECHA);
      fecha.setHours(fecha.getHours() + 6);
      let hora = fecha.toLocaleString();
      this.trscnSolCredForm.patchValue(
        {
          ESTADO_ACT: resp[0].NOM_ESTADOACT,
          USUARIO:resp[0].NOM_USUARIO,
          FECHA:hora,
          DETALLE:resp[0].DETALLE,
        }
        )
        this.trscnSolCredForm.disable();
      //this.transaccion =resp.allTransc;
      this.modalService.open(modal, {
        backdrop: false,
        centered: true,
        //fullscreen:true
        size: "xl",
      });
    })
    
  }

  cargarAnalistas()
  {
    this.creditoService.cargarAnalistaCreditos()
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.analista = resp;
    })
  }
  cargarEstadosTransaccion()
  {
    this.creditoService.cargarTrnscEstadosSolic().
    subscribe((resp:any)=>
    {
      //console.log(resp);
      this.estados = resp;
    })
  }

  changeEstado(id:number)
  {
    this.estadoSelected = id;
    this.cargarAnalistas();
    //console.log(this.estadoSelected)
  }

  modalOpenBackdrop(modal: any) {
    this.cargando = true;
    this.trscnSolCredForm.reset();
    this.modalService.open(modal, {
      backdrop: false,
      centered: true,
      //fullscreen:true
      size: "xl",
    });
    this.trscnSolCredForm.patchValue({
      NUM_SOLICITUD: this.idSolicitud
    })
    this.cargarEstadosTransaccion();
    this.trscnSolCredForm.enable();
    this.cargando = false;
  }

  cerrarModal(modalEdit: any) {
    this.trscnSolCredForm.reset();
    this.trscnSolCredForm.get('ESTADO_ACT').setValue(null);
    this.estadoSelected = 0;
    this.modalService.dismissAll(modalEdit);
    this.editado = false;
    this.cargarTransaccionesSolicitud(this.idSolicitud);
  }

  evitarSubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
  
}
