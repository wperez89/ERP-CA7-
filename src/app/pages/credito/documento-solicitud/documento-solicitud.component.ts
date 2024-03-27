import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { errorDialog } from 'src/app/helpers/Notificaciones';
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
  idSolicitud = '';
  estado = '';
  documento:[]=[];
  cargando:boolean = false;
  constructor( private activatedRoute:ActivatedRoute, private cryptService:CryptoService, 
    private creditoService:CreditoService, private archivoService:ArchivoDigitalService, private usuarioservice:UsuarioService) 
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
}
