import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { errorDialog, SuccessDialog, Toast } from 'src/app/helpers/Notificaciones';
import { tbl_Asamblea } from 'src/app/models/asamblea/asamblea';
import { AsambleaService } from 'src/app/services/asamblea.service';

@Component({
  selector: 'app-asistentes',
  templateUrl: './asistentes.component.html',
  styleUrls: ['./asistentes.component.scss']
})
export class AsistentesComponent implements OnInit {
  asistenteForm:FormGroup;
  asamblea:tbl_Asamblea[]=[];
  editado:boolean = false;
  cargando:boolean = false;
  cedula:string = '';
  existe:boolean = false;
  condicion:string = '';
  paletaAsignada:number = 0;
  asambleaid:number=0;

  private asambleaService = inject(AsambleaService)
  private fb = inject(FormBuilder)

  ngOnInit(): void {
    this.cargarForm();
  }

  cargarForm()
  {
    this.cargarAsamblea();
    this.asistenteForm = this.fb.group(
      {
        IDENTIFICACION:['',Validators.required],
        NOMBRE:[{value:'',disabled:true},Validators.required],
        ID_ASAMBLEA:['',Validators.required],
        OBSERVACION:[''],
        PALETA:[{value:'',disabled:true},Validators.required],
        CONDICION:[{value:'',disabled:true},Validators.required],
        ID_DELEGADO:['',Validators.required],
        FECHA:[{value:'',disabled:true}],
        EDITADO:false
  }
)
  }
  
  cargarAsamblea()
  {
    this.asambleaService.cargarListaAsambleas(0,'A')
    .subscribe((resp:any)=>{
      //console.log(resp)
      this.asamblea = resp;
      this.paletaAsignada = this.asamblea[0].CSC_ASISTENCIA
      this.asambleaid = resp[0].ID_ASAMBLEA
      //console.log(this.asamblea)
    })
  }

  cargarCedulaDelegado()
  {
  
    this.cedula = this.asistenteForm.get('IDENTIFICACION').value;
    if(this.cedula.length > 0)
      {

        this.asambleaService.cargarCondicionDelegado(this.cedula)
        .subscribe((resp:any)=>
          {
            //console.log(resp)
            if(!resp.ok)
              {
                errorDialog.fire(
            {
              title:"No Existe como Delegado",
              text:"Favor Verificar la cédula"
            }
          )
          this.asistenteForm.reset();
        }
        else
        {
          this.asistenteForm.get('IDENTIFICACION').disable();
          this.existe = true;
          this.condicion = resp.delegado[0].CONDICION
          this.asistenteForm.patchValue({
            NOMBRE: resp.delegado[0].NOMBRE_COMPLETO,
            ID_DELEGADO: resp.delegado[0].ID_DELEGADO,
            PALETA: this.paletaAsignada,
            CONDICION:this.condicion
          })
        }
      })
    }
    }

  limpiar()
  {
    this.cargando = true;
      this.asistenteForm.reset();
      this.cargarForm();
      this.existe = false;
      this.cargando = false;   
  }

  guardarAsistente()
  {


    this.habilitarCampos();
    //console.log(this.asistenteForm.value)
    if(this.asistenteForm.invalid)
      {
        Toast.fire({
          text:"Complete todos los Campos"
        })
        return;
      }
    else
    {
      this.asambleaService.crearAsistenteAsamblea(this.asistenteForm.value)
      .subscribe((resp:any)=>
        {
          this.cargando = true;
          //console.log(resp)
          if(!resp.ok)
            {
              errorDialog.fire(
                {
                  title: "Error Guardar Delegado",
                  text: resp.msg
                }
              )
            }
            else{
              SuccessDialog.fire({
                title: "Asistencia Delegado Correcta",
                  text: resp.msg
              })
            }
            timer(4000).subscribe(_=>{
              this.limpiar();
              this.cargando = false;
            })
        }
      )
        

    }  
    }

  habilitarCampos()
  {
    this.asistenteForm.get('PALETA').enable();
    this.asistenteForm.get('CONDICION').enable();
    this.asistenteForm.get('IDENTIFICACION').enable();
    this.asistenteForm.get('FECHA').enable();
    this.asistenteForm.get('CONDICION').enable();
  }

}
