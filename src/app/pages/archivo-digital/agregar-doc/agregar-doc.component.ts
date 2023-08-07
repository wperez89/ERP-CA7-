import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SuccessDialog, Toast } from 'src/app/helpers/Notificaciones';
import { areaDocumental, tipoConvocatoria, tipoDocumento } from 'src/app/models/archivoDigital/tablasArchivoDig.models';
import { ArchivoDigitalService } from 'src/app/services/archivo-digital.service';

@Component({
  selector: 'app-agregar-doc',
  templateUrl: './agregar-doc.component.html',
  styleUrls: ['./agregar-doc.component.scss']
})
export class AgregarDocComponent implements OnInit {
  public documentDigitalForm: FormGroup
  public tipodoc: tipoDocumento[]=[];
  public tipoConvocatoria: tipoConvocatoria[]=[];
  public AreaDoc: areaDocumental[]=[];
  public archivoLength: boolean = false;
  public archivoSelected : File;
  public docSelected:number = 1;

  constructor(private archivoService:ArchivoDigitalService, private fb: FormBuilder, private router:Router) { 
    this.documentDigitalForm= this.fb.group(
      {
        ID_ARCHIVO:[''],
        TIPO_DOC:['',Validators.required],
        AREA:['',Validators.required],
        NUM_SESION:[''],
        FECHA:['',Validators.required],
        CONVOCATORIA:[''],
        ARCHIVO:[null],
        VERSION_DOC:['',Validators.required],
        ESTADO:[''],
      });
  }

  ngOnInit(): void {
    this.getTipoDocumentos();
    this.getTipoConvocatoria();
    this.getArea();
  }

  guardarDocumento()
  {
    //console.log(this.documentDigitalForm.value)
    this.archivoService.crearRegistroDoc(this.documentDigitalForm.value,this.archivoSelected)
    .subscribe((resp:any)=>
      {
        console.log(resp)
        if(!resp.ok)
        {
          Toast.fire(
            {
              text:(resp.msg)
            }
          )
        }
        else
        {
          SuccessDialog.fire(
            {
              text:resp.msg
            }
          )
          this.documentDigitalForm.reset();
          this.router.navigate(['/archivo-digital']);
        }
      }
    )
  }

  getTipoDocumentos()
  {
    this.archivoService.cargarTipoDoc()
    .subscribe((resp:any)=>
      {
        this.tipodoc = resp
      }
    )
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

  getTipoConvocatoria()
  {
    this.archivoService.cargarTipoConvocatoria()
    .subscribe((resp:any)=>
      {
        this.tipoConvocatoria = resp
      }
    )
  }

  checkFileInput(event:any) {
    if (event.target.files && event.target.files.length > 0) 
    {
        this.archivoLength = true
        this.archivoSelected = event.target.files[0];
        //console.log(this.archivoSelected)
    }
    else 
    {
      this.archivoLength = false
    }
  }

  changeTipoDoc()
  {
    this.docSelected = this.documentDigitalForm.get('TIPO_DOC').value;
    if(this.docSelected !=1)
    {
      this.documentDigitalForm.patchValue({
        NUM_SESION:0,
        CONVOCATORIA:0
      })
    }
    console.log(this.documentDigitalForm.value)
  }
}
