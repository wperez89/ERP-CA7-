import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SuccessDialog, errorDialog } from 'src/app/helpers/Notificaciones';
import { areaDocumental } from 'src/app/models/archivoDigital/tablasArchivoDig.models';
import { ArchivoDigitalService } from 'src/app/services/archivo-digital.service';

@Component({
  selector: 'app-area-documento',
  templateUrl: './area-documento.component.html',
  styleUrls: ['./area-documento.component.scss']
})
export class AreaDocumentoComponent implements OnInit {
  public areas:areaDocumental []=[];
  public areasTemp:areaDocumental []=[];
  public totalUsuarios: number = 0;
  public pagina: number = 1;
  public pagesize: number = 10;

  public cargando: boolean = true;
  public filtro = '';
  modal: NgbModalRef;
  public areasForm: FormGroup;
  
  constructor(private modalService: NgbModal, private archivoServices:ArchivoDigitalService, private router:Router,
    private fb:FormBuilder) { 
    this.areasForm= this.fb.group(
      {
        NOMBRE:['',Validators.required],
      });
  }

  ngOnInit(): void {
    this.obtenerAreasDoc();
  }

  createareaDoc()
  {
    if(this.areasForm.invalid)
      {
        return
      }
      this.archivoServices.crearAreaDoc(this.areasForm.value)
      .subscribe(resp=>{
      //console.log(resp);
      SuccessDialog.fire(
        {
          title:resp.msg
        }
      );
      this.obtenerAreasDoc();
      this.router.navigate(['/archivo-digital/mantenimiento/AreaDocumental']);
      },
      (err) => { // Si sucede un error
          
        //console.log(err);
        errorDialog.fire({
          title:err.msg
        })
      })
  }

  obtenerAreasDoc()
  {
    this.archivoServices.cargarAreaDoc()
    .subscribe((resp:any)=>
    {
      //console.log(resp)
      this.areas = resp
      this.areasTemp =resp
    })
  }

  filtrar()
  {
    if(this.filtro)
      {
        var filter = new RegExp(this.filtro,'i');
        this.areas = this.areasTemp.filter(item=>filter.test(item.NOMBRE))
      }
      else
      {
        this.areas = this.areasTemp;
      }
  }

  modalOpenBackdrop(modalEditUser: any) {
    this.modalService.open(modalEditUser, {
      backdrop: false,
      centered: true
    });
  }
}
