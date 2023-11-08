import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SrvRecord } from 'dns';
import { SuccessDialog, Toast, errorDialog } from 'src/app/helpers/Notificaciones';
import { Paises, cargarGenero } from 'src/app/interfaces/cargar-personas.interface';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-persona-nueva',
  templateUrl: './persona-nueva.component.html',
  styleUrls: ['./persona-nueva.component.scss']
})
export class PersonaNuevaComponent implements OnInit {
  public tipoPersona:any = ["COD_PERSONA","DESCRIPCION"];
  public tipoGenero: cargarGenero
  public tipoPais: Paises
  public personForm : FormGroup
  public TipoSeleccionado: number = 1
  public paisDefault: string = 'CR'
  public cedula:string = '';
  public mostrar = false;
  public tipocedFisico = false; 

  constructor(private personaService:PersonasService,private fb:FormBuilder,private router: Router) { 
    if(this.TipoSeleccionado !=2)
    {
      this.personForm= this.fb.group(
        {
          TIPO_PERSONA:['',Validators.required],
          IDENTIFICACION:['',Validators.required],
          NOMBRE:['',Validators.required],
          APELLIDO1:['',Validators.required],
          APELLIDO2:['',Validators.required],
          GENERO:['',Validators.required],
          FECHA:['',Validators.required],
          PAIS:['',Validators.required],
          APNFDS:['',Validators.required],
        });
    }
    else
        {
          this.personForm= this.fb.group(
            {
              TIPO_PERSONA:['',Validators.required],
              IDENTIFICACION:['',Validators.required],
              NOMBRE:['', Validators.required],
              FECHA:['',Validators.required],
              PAIS:['',Validators.required],
              APNFDS:['',Validators.required],
            });
        }
  }

  ngOnInit(): void {
    this.cargarTipoPersona();
    this.cargarTipoGenero();
    this.cargarTipoPais();
    this.personForm.patchValue({
      TIPO_PERSONA: this.TipoSeleccionado,
      PAIS: this.paisDefault
    });
  }

  cargarTipoPersona()
    {
      this.personaService.cargarTipoPersona()
      
      .subscribe((tipoPersona: {COD_PERSONA,DESCRIPCION})=>
      {
        this.tipoPersona = tipoPersona;
        //console.log(this.tipoPersona)
      })
    }
  
   cargarTipoGenero()
    {
      this.personaService.cargarTipoGenero()
      .subscribe((tipoGenero)=>
      {
        this.tipoGenero = tipoGenero;
       //console.log(this.tipoGenero)
      })
    }

    cargarTipoPais()
    {
      this.personaService.cargarTipoPais()
      
      .subscribe((tipoPais)=>
      {
        this.tipoPais = tipoPais;
       //console.log(this.tipoGenero)
      })
    }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.TipoSeleccionado = this.personForm.get('TIPO_PERSONA').value;
    //console.log(this.TipoSeleccionado)
    if(this.TipoSeleccionado ===2)
    {
      this.personForm.patchValue({
        APELLIDO1: '',
        APELLIDO2:'',
        GENERO:''
      });
    }
}

  createPerson()
  {
    //console.log(this.personForm);
    this.personaService.crearPersonas(this.personForm.value)
    .subscribe((resp:any)=>{
    if(!resp.ok)
      if(this.personForm.invalid)
      {
        //console.error(resp)
        Toast.fire(
          {
            text:('resp.msg')
          }
        );
      }
      else{
        errorDialog.fire(
          {
            text:(resp.msg)
          }
        )
      }
    else
    {
      SuccessDialog.fire(
      {
        title:(resp.msg)
      });

      this.router.navigate(['/persona']);
    }
    },
    (error) => { // Si sucede un error
        
      //console.error(error);
      errorDialog.fire({
        title:error.msg
      })
    })
  }
  
  cargarAPICedula()
  {
    this.cedula = this.personForm.get('IDENTIFICACION').value;
    this.mostrar = true;
    this.personaService.getPersonaAPI(this.cedula)
    .subscribe((resp:any)=>
    {
      //console.log(resp);
     if(resp.ok)
     {
      if(resp.persona)
      {
        const persona = resp.persona[0]
        if(persona.guess_type === "FISICA")
        {
          this.TipoSeleccionado = 1;
          this.personForm.patchValue({
            TIPO_PERSONA: parseInt(persona.guess_type_num,10),
            APELLIDO1: resp.persona[0].lastname1,
            APELLIDO2:resp.persona[0].lastname2,
            NOMBRE:resp.persona[0].firstname,
          });
        }
        else
        {
          this.TipoSeleccionado = 2;
          this.personForm.patchValue({
            TIPO_PERSONA: parseInt(persona.guess_type_num,10),
            APELLIDO1:'',
            APELLIDO2:'',
            NOMBRE:resp.persona[0].fullname,
          });
        }
      }
      else
      {
        Toast.fire(
          {
            text:("Persona No Existe. Favor Incluirlo Manualmente")
          }
        )
      }
     }
     else
     {
      errorDialog.fire(
        {
          text:("Consulte al Administrador")
        }
      )
     }
    })
  }

  evitarSubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
}
