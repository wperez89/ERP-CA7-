import { Component, OnInit } from '@angular/core';
import { url } from 'inspector';
import { Confirmation, Toast, showConfirmationAlert } from 'src/app/helpers/Notificaciones';
import { archivoDig_Lista } from 'src/app/models/archivoDigital/archivoDigital.models';
import { areaDocumental } from 'src/app/models/archivoDigital/tablasArchivoDig.models';
import { ArchivoDigitalService } from 'src/app/services/archivo-digital.service';
import { AvaluoService } from 'src/app/services/avaluo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archivo-digital',
  templateUrl: './archivo-digital.component.html',
  styleUrls: ['./archivo-digital.component.scss']
})
export class ArchivoDigitalComponent implements OnInit {
  public documentos:archivoDig_Lista[] = [];
  public documentosTemp:archivoDig_Lista[] = [];
  public AreaDoc: areaDocumental[]=[];
  public filtro = '';
  public cargando: boolean = true;
  public pagina: number = 1;
  public pagesize: number = 10;
  public document: string = '';
  public areaSelected: number = 0;

  constructor(private archivoService:ArchivoDigitalService, private avaluoService:AvaluoService) { }

  ngOnInit(): void {
    this.getDocumentos();
    this.getArea();
  }

  getArea()
  {
    this.archivoService.cargarAreaDoc()
    .subscribe((resp:any)=>
      {
        this.AreaDoc = resp
      }
    )
  }

  changeArea()
  {
    this.areaSelected;
    this.getDocumentos();
  }

  getDocumentos() {
    this.cargando = true;
    this.archivoService.cargarListaDoc(this.areaSelected)
    .subscribe((resp:any)=>
       {
        this.documentos = resp;
        this.documentosTemp = resp;
        this.cargando = false;
       })
  }

  downloadfile(nombreArchivo:string)
  {
    if(!nombreArchivo)
    {
      Toast.fire(
        {
          text:("No hay Archivo Cargado")
        }
      )
    }
    else
    {

      this.avaluoService.downloadFile(nombreArchivo,'archivo-digital')
      .subscribe((archivo: Blob)=>
      {
        const url = URL.createObjectURL(archivo);
        const link = document.createElement('a');
        link.href = url;
        link.download = nombreArchivo;
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
    }
  }

  EliminarDocumento(id_cedula:number, archivo:string)
  {
    const title = 'Estás Seguro de Eliminar el Documento:'
    const text = archivo
    showConfirmationAlert(title,text,"Eliminar").then((result) => {
        if (result.isConfirmed) {
          // Aquí puedes poner la lógica para eliminar el elemento
          console.log('Elemento eliminado');
        } else {
          // Aquí puedes poner la lógica en caso de que se cancele el confirm
          console.log('Eliminación cancelada');
        }
      });
  }

  verPDF(nombreArchivo:string) {
    this.archivoService.obtenerURLArchivo('archivo-digital', nombreArchivo)
      .subscribe(
        (resp:any) => {
          //console.log(resp)
          window.open(resp.urlPDF, '_blank'); // Abre el PDF en una nueva ventana
        },
        (error) => {
          console.error('Error al obtener la URL del PDF:', error);
        }
      );
  }

  filtrar()
  {}
}
