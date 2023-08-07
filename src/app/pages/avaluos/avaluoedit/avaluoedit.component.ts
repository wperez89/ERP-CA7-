
import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { infoAvaluos } from 'src/app/models/avaluos/avaluo.models';
import { Canton, Distrito, Provincia } from 'src/app/models/global';
import { AvaluoService } from 'src/app/services/avaluo.service';

@Component({
  selector: 'app-avaluoedit',
  templateUrl: './avaluoedit.component.html',
  styleUrls: ['./avaluoedit.component.scss']
})
export class AvaluoeditComponent implements OnInit {
  public avaluoForm:FormGroup;
  public Provincia: Provincia[] = [];
  public Canton: Canton[] = [];
  public Distrito: Distrito[] = [];
  public infoAvaluo: infoAvaluos[] = [];
  public provinciaDefault:number;
  public cantonDefault:number;
  public distritoDefault:number;
  public idAvaluo = '';
  public terreno:number = 0;
  public construccion:number = 0;
  public avaluoMonto:number = 0;
  public GarantiaMonto:number = 0;
  public cargando: boolean = true;
  public archivoSelected : File;
  public archivoLength:boolean = false;
  public document: string = '';

  constructor(private avaluoService:AvaluoService, private fb:FormBuilder,private activatedRoute: ActivatedRoute) { 
    this.avaluoForm= this.fb.group(
      {
        ID_AVALUO:['',Validators.required],
        CEDULA:['',Validators.required],
        NOMBRE:['',Validators.required],
        PROVINCIA:['',Validators.required],
        CANTON:['',Validators.required],
        DISTRITO:['',Validators.required,],
        NUM_FINCA:['',Validators.required],
        AREA_TERRENO:['',Validators.required],
        AREA_CONSTRUC:['',Validators.required],
        MONTO_EDIFICIO:['',Validators.required],
        MONTO_TERRENO:['',Validators.required],
        MONTO_AVALUO:['',Validators.required],
        MONTO_GARANTIA:['',Validators.required],
        DOCUMENTO:['',Validators.required],
        ID_CLIENTE:[''],
        ESTADO:[''],
      });
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({id})=> this.cargarInfoAvaluos(id));
  }

  getProvincia() {
    
    this.avaluoService.cargarProvincia()
    .subscribe((provincia :any)=>
       {
        this.Provincia = provincia;
        //console.log(this.Provincia)
       })
  }

  obtenerValorProvincia(value: number)
  {
    this.provinciaDefault = value;
   // console.log(this.provinciaDefault)
    if(this.provinciaDefault!=7)
    {

      this.cantonDefault = parseInt(this.provinciaDefault+ "01");
      this.getCanton();
      this.obtenerValorCanton(this.cantonDefault);
      this.getDistrito();
      this.distritoDefault = parseInt(this.cantonDefault + "01");
    }
    else
    {
      this.cantonDefault = 701;
      this.getCanton()
      this.obtenerValorCanton(this.cantonDefault);
      this.getDistrito()
      this.distritoDefault = parseFloat(this.cantonDefault.toString() + "01")
    }   
  }

  getCanton() {
    this.avaluoService.cargarCanton(this.provinciaDefault)
    .subscribe((canton :any)=>
       {
        this.Canton = canton;
       })
  }

  obtenerValorCanton(value: number)
  {
    this.cantonDefault = value;
    //console.log(this.provinciaDefault);
    this.distritoDefault = parseFloat(value.toString + "01")
    this.getDistrito()
    
  }

  getDistrito() {
    this.avaluoService.cargarDistrito(this.cantonDefault)
    .subscribe((distrito :any)=>
       {
        //console.log(distrito)
        this.Distrito = distrito;
       })
  }

  obtenerValorDistrito(value: any)
  {
    this.distritoDefault = value.target.value;
    //console.log(this.provinciaDefault);
  }

  cargarInfoAvaluos(id:string)
  {
    this.cargando = true;
    this.avaluoService.cargarInfoAvaluos(id).
    subscribe((resp:any)=>
    {
      this.infoAvaluo = resp;
      this.idAvaluo = resp.ID_AVALUO;
      this.avaluoForm.patchValue({
        ID_AVALUO:resp.ID_AVALUO,
        CEDULA:resp.IDENTIFICACION,
        ID_CLIENTE:resp.ID_CLIENTE,
        NOMBRE:resp.NOMBRE,
        PROVINCIA:resp.PROVINCIA,
        CANTON:resp.CANTON,
        DISTRITO:resp.DISTRITO,
        NUM_FINCA:resp.NUM_FINCA,
        AREA_TERRENO:resp.AREA_TERRENO,
        AREA_CONSTRUC:resp.AREA_CONSTRUC,
        MONTO_EDIFICIO:resp.MONTO_EDIFICIO,
        MONTO_TERRENO:resp.MONTO_TERRENO,
        MONTO_GARANTIA:resp.MONTO_GARANTIA,
        ESTADO:resp.ESTADO,
        MONTO_AVALUO:resp.MONTO_EDIFICIO + resp.MONTO_TERRENO
      })
      this.provinciaDefault = resp.PROVINCIA;
      this.cantonDefault = resp.CANTON;
      this.distritoDefault = resp.DISTRITO
      this.document = resp.DOCUMENTO
      this.getProvincia();
      this.getCanton();
      this.getDistrito();
      this.cargando = false;
    })
  }

      //Actualizar Usuario
    updateAvaluo()
    {
      //console.log(this.idUser);
      this.avaluoService.updateAvaluoID(this.avaluoForm.value)
      .subscribe(resp=>{
        //console.log(resp);
        SuccessDialog.fire(
          {
            title:(resp.msg)
          }
        );
        //this.router.navigate(['/usuario']);
        },
        (err) => { // Si sucede un error
            
          console.log(err);
          errorDialog.fire({
            title:err.error.msg
          })
        })
    }

    updateAvaluoTotal()
    {
      let edificio = this.avaluoForm.get('MONTO_EDIFICIO').value
      let terreno = this.avaluoForm.get('MONTO_TERRENO').value
      console.log(edificio + terreno)
      this.avaluoForm.patchValue({
        MONTO_AVALUO: edificio + terreno
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

    //Subir Archivo de Avaluo
    uploadAvaluo()
  {
    this.avaluoService.uploadArchivoAvaluo(this.idAvaluo,this.archivoSelected).subscribe(
      (resp)=>
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
        else{
          SuccessDialog.fire(
            {
              text:(resp.msg)
            }
          );
        }
      },
      (err) =>
      {
        console.log(err)
      }
    )
  }

  downloadfile()
  {
    const nombreArchivo = this.document;
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
