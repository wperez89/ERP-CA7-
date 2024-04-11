import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { errorDialog, SuccessDialog, Toast } from 'src/app/helpers/Notificaciones';
import { ArchivosSolicitudCred } from 'src/app/models/credito/credito.models';
import { Usuario } from 'src/app/models/User/usuario.models';
import { ArchivoDigitalService } from 'src/app/services/archivo-digital.service';
import { CreditoService } from 'src/app/services/credito.service';
import { CryptoService } from 'src/app/services/crypto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-documento-solicitud',
  templateUrl: './documento-solicitud.component.html',
  styleUrls: ['./documento-solicitud.component.scss']
})
export class DocumentoSolicitudComponent {
  documentSolicForm:FormGroup;
  usuario:Usuario;
  idSolicitud = '';
  estado = '';
  documento:[]=[];
  categoria:[]=[];
  tipoArch:[]=[];
  documentos: FormArray;
  archivos:ArchivosSolicitudCred[] = [];
  cargando:boolean = false;
  archivoSelected : File;
  archivoLength:boolean = false;

  constructor( private activatedRoute:ActivatedRoute, private fb:FormBuilder, private cryptService:CryptoService, 
    private creditoService:CreditoService, private archivoService:ArchivoDigitalService, private modalService: NgbModal, 
    private usuarioservice:UsuarioService) 
 {}

 ngOnInit(): void {
  this.activatedRoute.params.subscribe((params)=>
    {
      if(params['id'])
      {
        this.idSolicitud = this.cryptService.decrypt(params['id']) ;
        this.estado = params['estado'];
        
        this.cargardocSolicitud();
      }
    })
 }

 get nomDocumentoArray(): FormArray {
  return this.documentSolicForm.get('NOM_DOCARRAY') as FormArray;
}

 cargardocSolicitud()
 {
  this.cargando = true;
  //console.log(this.idSolicitud)
  this.creditoService.obtenerDocumentoSolicitud(this.idSolicitud)
  .subscribe((resp:any)=>
  {
    //console.log(resp)
    this.documento = resp;
    this.cargando = false;
  },error=>{
    this.usuarioservice.logOut();
  })
 }

 descargarDocs(nombreArch:string)
{
  this.archivoService.obtenerURLArchivo('credito', nombreArch)
    .subscribe(
      (resp:any) => {
        //console.log(resp)
        window.open(resp.urlPDF, '_blank'); // Abre el PDF en una nueva ventana
      },
      (error) => {
        //console.error('Error al obtener la URL del PDF:', error);
        errorDialog.fire({
          text:"Consulte al Administrador"
        })
      }
    );
}

cargarForm()
{
  this.documentSolicForm = this.fb.group({
    NOM_DOCUMENT:[""],
    NOM_ARCHIVO:[""],
    REF_SOLICITUD:[""],
    USUARIO: ["", Validators.required],
    DOCUMENTO:this.fb.array([])
  })
  this.documentos = this.documentSolicForm.get('DOCUMENTO') as FormArray;
  this.usuario = this.usuarioservice.usuario;
}

modalOpenBackdrop(modal: any) {
  this.cargando = true;
  this.cargarForm();
  this.documentSolicForm.reset();
  this.modalService.open(modal, {
    backdrop: false,
    centered: true,
    //fullscreen:true
    size: "xl",
  });
  this.documentSolicForm.patchValue({
    REF_SOLICITUD: this.idSolicitud
  })

  this.cargarCategoriaArchivos();
  this.documentSolicForm.enable();
  this.cargando = false;
}

cargarCategoriaArchivos()
  {
    
    this.archivoService.cargarCategoriaArchivo()
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      this.categoria = resp;
    })
  }

  cargarNombreArchivos(id:number)
  {
    //this.cargando =true;

    this.archivoService.cargarTipoArchivo(id)
    .subscribe((resp:any)=>
    {
      //console.log(resp);
      this.tipoArch = resp;
      this.cargando = false;
    })
  }

  cerrarModal(modalEdit: any) {
    this.documentSolicForm.reset();
    this.archivos =[];

    this.modalService.dismissAll(modalEdit);
    this.documentos.clear();
    this.cargardocSolicitud();
  }

  evitarSubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

  checkFileInput(event:any) {
    if (event.target.files && event.target.files.length > 0) 
    {
        this.archivoLength = true
        this.archivoSelected = event.target.files;
        //console.log(this.archivoSelected)
    }
    else 
    {
      this.archivoLength = false
    }
  }
  agregarArchivo(event)
  {
    const extensionesValidas = ['pdf','docx','xlsx','png','jpeg'];
    const tipoDoc = this.documentSolicForm.get('NOM_DOCUMENT').value;
    const documento = this.documentSolicForm.get('NOM_ARCHIVO').value.split("-");
    const tipoArch = documento[0];
    const NombreArch = documento[1];
    const archivo = (event.target as HTMLInputElement).files[0];
    //console.log(tipoArch);
    const extensionArchivo = archivo.name.split(".")
    //console.log(extensionArchivo[1])
    if(!extensionesValidas.includes(extensionArchivo[1]))
    {
      //console.log("Extension no Valida")
      Toast.fire({
        text:"Extension no Valida. Archivos permitidos pdf, docx, xlsx, png, jpeg"
      })
      return
    }
    this.documentos.push(this.fb.group({
      documento: archivo,
      tipoDoc,
      tipoArch,
      NombreArch
    }));
    //console.log(this.documentos.controls)
    this.documentSolicForm.get('NOM_DOCUMENT').setValue('');
    this.documentSolicForm.get('NOM_ARCHIVO').setValue('');
    SuccessDialog.fire({
      text: 'Documento Cargado Correctamente'
    })
    const input = event.target as HTMLInputElement;
    input.value = '';
  }

  eliminarArchivo(index: number) {
    this.documentos.removeAt(index);
  }

  createDocument(modal:any)
  {
    this.documentSolicForm.patchValue({
      USUARIO:this.usuario.ID_USUARIO,
    })
    console.log(this.documentSolicForm.value)
    const formValue = this.documentSolicForm.value;
    const archivos = formValue.DOCUMENTO;
    this.creditoService.crearDocumento(this.documentSolicForm.value, archivos)
    .subscribe((resp:any)=>
    {
      if(resp.ok)
      {
        this.documentos.clear();
        this.cerrarModal(modal);
        this.cargardocSolicitud();
        this.documentSolicForm.reset();
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
}
