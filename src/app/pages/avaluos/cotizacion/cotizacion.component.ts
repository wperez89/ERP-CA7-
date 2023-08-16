import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { cotizacion, ctznLista } from 'src/app/models/avaluos/ctzn.models';
import { Tbl_Profesiones } from 'src/app/models/global';
import { ProfesionalesLista } from 'src/app/models/personas/persona.models';
import { AvaluoService } from 'src/app/services/avaluo.service';
import { GlobalService } from 'src/app/services/global.service';
import { PersonasService } from 'src/app/services/personas.service';
CommonModule
@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.scss']
})
export class CotizacionComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  public profesion: Tbl_Profesiones[] =[];
  public profesional: ProfesionalesLista[] = [];
  public perito: ctznLista[] = [];
  public notario: ctznLista[] = [];
  public cotizacion: cotizacion[] = [];
  public ctznForm: FormGroup;
  public id_avaluo: string = '';
  public id_ctzcn: string = '';
  public variable_prof: number;
  public profesional_default : any = ''; 
  public existe:boolean = false;
  public asignado:boolean = false;
  public archivoLength:boolean = false;
  public document: string = '';
  public archivoSelected : File;
  public cargando: boolean = false;

  constructor(private avaluoService: AvaluoService, private globalService: GlobalService,private personaService:PersonasService,
    private activatedRoute:ActivatedRoute, private fb: FormBuilder) { 
      this.ctznForm= this.fb.group(
      {
        ID_COTIZACION:['',Validators.required],
        TIPO_CTZCN:['',Validators.required],
        FECHA_CTZCN:['',Validators.required],
        PROFESIONAL:['',Validators.required],
        MONTO:[''],
        ASIGNADO:[''],
        OBSERVACIONES:[''],
        DOC_CTZCN:[null],
        ID_AVALUO:['']
      });
  }

  ngOnInit(): void {
    this.id_avaluo = this.activatedRoute.snapshot.params['id'];
    this.getTblProfesiones();
    this.activatedRoute.params.subscribe(({id})=> this.getctznPeritos(id));
    this.activatedRoute.params.subscribe(({id})=> this.getctznNotario(id)); 
  }

  getTblProfesiones() {
    
    this.globalService.cargarProfesiones()
    .subscribe((resp:any)=>
       {
        this.profesion = resp;
        //console.log(this.profesion)
       })
  }

  getProfesionales(value:number) {
    this.personaService.getListaProf_Tipo(value)
    .subscribe((resp:any)=>
       {
        this.profesional = resp;
          this.ctznForm.patchValue({
          PROFESIONAL:this.profesional[0].ID_PROFESIONAL
        });
       })
  }
  
  changetipoProfesional(value:number)
  {
    this.variable_prof = value;
    this.getProfesionales(this.variable_prof )
    /*this.ctznForm = this.fb.group({
      PROFESIONAL:[this.profesional[1]]
    })*/
  }

  getctznPeritos(id_avaluo:string) {
    
    this.avaluoService.cargarCtznAvaluos(1,id_avaluo)
    .subscribe((resp:any)=>
       {
        this.perito = resp.ctzn;
        //console.log(this.perito)
       })
  }

  getctznNotario(id_avaluo:string) {
    
    this.avaluoService.cargarCtznAvaluos(2,id_avaluo)
    .subscribe((resp:any)=>
       {
        this.notario = resp.ctzn;
       })
  }

  getProfesionalID(id:string)
  {
    
    this.personaService.getProfesionalID(id)
    .subscribe((resp:any)=>
       {
        this.profesional = resp;
        //console.log(this.profesional)
       })
  }

  guardarCTZN()
  {  
    //console.log(this.existe)
    this.ctznForm.patchValue({
      ID_AVALUO:this.id_avaluo
    });
    
    if(!this.existe)
    {
      this.ctznForm.patchValue({
        ASIGNADO:0
      });
      this.avaluoService.crearCtzcnAvaluo(this.ctznForm.value).subscribe(
        (resp)=>{
          if(!resp.ok)
          {
            if(this.ctznForm.invalid)
            {
              Toast.fire(
                {
                  text:(resp.msg)
                }
              );
            }
            else
            {
              errorDialog.fire(
                {
                  text:(resp.msg)
                }
                )
            }
          }
          else
          {
            SuccessDialog.fire(
              {
                title:(resp.msg)
              });
              this.getctznPeritos(this.id_avaluo);
              this.getctznNotario(this.id_avaluo);
              this.ctznForm.reset();
              this.existe = false;
            }
        },
        (err) => { // Si sucede un error
          errorDialog.fire({
            title:err.error.msg
          })
        })
        
    }
    else
    {
      this.avaluoService.updateCtzcnAvaluo(this.ctznForm.value).subscribe(
        (resp)=>{
          if(!resp.ok)
          {
            if(this.ctznForm.invalid)
            {
              Toast.fire(
                {
                  text:(resp.msg)
                }
              );
            }
            else
            {
              errorDialog.fire(
                {
                  text:(resp.msg)
                }
                )
            }
          }
          else
          {
            SuccessDialog.fire(
              {
                title:(resp.msg)
              });
              this.getctznPeritos(this.id_avaluo);
              this.getctznNotario(this.id_avaluo);
              this.ctznForm.reset();
              this.existe = false;
            }
        },
        (err) => { // Si sucede un error
          errorDialog.fire({
            title:err.error.msg
          })
        }
        )
        
    }
    
    
  }

  cargarCotizacion(id_avaluo:string)
  {
    this.cargando = true;
    this.ctznForm.reset();
    this.avaluoService.cargarCtznID(id_avaluo)
      .subscribe((resp:any)=>
      {
        this.cotizacion = resp;
        //console.log(this.cotizacion);
        this.ctznForm.patchValue({
          ID_COTIZACION: resp.ID_COTIZACION,
          ID_AVALUO:resp.ID_AVALUO,
          TIPO_CTZCN:resp.TIPO_CTZCN,
          FECHA_CTZCN:resp.FECHA_CTZCN,
          PROFESIONAL:resp.PROFESIONAL,
          MONTO:resp.MONTO,
          ASIGNADO:resp.ASIGNADO,
          OBSERVACIONES:resp.OBSERVACIONES,
          ESTADO:resp.ESTADO,
        });
        this.id_ctzcn = resp.ID_COTIZACION
        this.document = resp.DOC_CTZCN
        this.getProfesionalID(resp.PROFESIONAL);
        this.existe = true;
        this.asignado = resp.ASIGNADO
        this.archivoLength = false;
        this.cargando = false;
      })
      
  }

  checkFileInput(event:any) {
    if (event.target.files && event.target.files.length > 0) {
      this.archivoLength = true
      this.archivoSelected = event.target.files[0];
    } else {
      this.archivoLength = false
    }
  }
  uploadCotizacion()
  {
    this.avaluoService.uploadCotizacion(this.id_ctzcn,this.archivoSelected).subscribe(
      (resp)=>
      {
        //console.log(resp)
        if(!resp.ok)
        {
          Toast.fire(
            {
              text:(resp.msg)
            }
          )
        }
        else{
          SuccessDialog.fire(
            {
              text:(resp.msg)
            }
          );
          this.ctznForm.reset();
          this.existe = false;
        }
      },
      (err) =>
      {
        errorDialog.fire({
          title:err.error.msg
        })
      }
    )
  }

  downloadfile()
  {
    const nombreArchivo = this.document;
    //console.log(nombreArchivo);
    this.avaluoService.downloadFile(nombreArchivo,'avaluos')
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
