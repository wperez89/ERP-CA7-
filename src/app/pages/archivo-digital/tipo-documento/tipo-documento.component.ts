import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialog, errorDialog } from 'src/app/helpers/Notificaciones';
import { tipoDocumento } from 'src/app/models/archivoDigital/tablasArchivoDig.models';
import { ArchivoDigitalService } from 'src/app/services/archivo-digital.service';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.scss']
})
export class TipoDocumentoComponent implements OnInit {

  public docs:tipoDocumento []=[];
  public docsTemp:tipoDocumento []=[];
  public totalUsuarios: number = 0;
  public pagina: number = 1;
  public pagesize: number = 10;

  public cargando: boolean = true;
  public filtro = '';
  modal: NgbModalRef;
  public docForm: FormGroup;
  
  constructor(private modalService: NgbModal, private archivoServices:ArchivoDigitalService, private router:Router,
    private fb:FormBuilder) { 
    this.docForm= this.fb.group(
      {
        NOMBRE:['',Validators.required],
      });
  }

  ngOnInit(): void {
    this.obtenerTipoDoc();
  }

  createareaDoc()
  {
    if(this.docForm.invalid)
      {
        return
      }
      this.archivoServices.crearTipoDoc(this.docForm.value)
      .subscribe(resp=>{
      console.log(resp);
      SuccessDialog.fire(
        {
          title:resp.msg
        }
      );
      this.obtenerTipoDoc();
      this.router.navigate(['/archivo-digital/mantenimiento/TipoDocumentos']);
      },
      (err) => { // Si sucede un error
        console.log(err)
        errorDialog.fire({
          title:err.msg
        })
      })
  }

  obtenerTipoDoc()
  {
    this.archivoServices.cargarTipoDoc()
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      this.docs = resp
      this.docsTemp =resp
    })
  }

  filtrar()
  {
    if(this.filtro)
      {
        var filter = new RegExp(this.filtro,'i');
        this.docs = this.docsTemp.filter(item=>filter.test(item.NOMBRE))
      }
      else
      {
        this.docs = this.docsTemp;
      }
  }

  modalOpenBackdrop(modalEditUser: any) {
    this.modalService.open(modalEditUser, {
      backdrop: false,
      centered: true
    });
  }


}
