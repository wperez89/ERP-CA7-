import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { Persona, datosPersonas } from "src/app/models/personas/persona.models";
import { PersonasService } from "src/app/services/personas.service";
import {
  Paises,
  RangoSalario,
  cargarGenero,
  condicionLaboral,
  sectorLaboral,
} from "src/app/interfaces/cargar-personas.interface";
import {
  SuccessDialog,
  Toast,
  errorDialog,
} from "src/app/helpers/Notificaciones";


@Component({
  selector: "app-personaedit",
  templateUrl: "./personaedit.component.html",
  styleUrls: ["./personaedit.component.scss"],
})
export class PersonaeditComponent implements OnInit {
  public persona: Persona;
  public datosPersona: datosPersonas;
  public tipoPersona: any = ["COD_PERSONA", "DESCRIPCION"];
  public idPerson: string = "";
  public tipoGenero: cargarGenero;
  public tipoPais: Paises;
  public rangoSalario: RangoSalario;
  public condicionLab:condicionLaboral;
  public sectorLab:sectorLaboral;
  public personEditForm: FormGroup;
  public datosForm: FormGroup;
  public TipoSeleccionado: number = 1;
  public paisDefault: string = "CR";
  public existe: number;
  public cargando: boolean = true;

  constructor(
    private personaService: PersonasService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
      this.personEditForm = this.fb.group({
        TIPO_PERSONA: ["", Validators.required],
        IDENTIFICACION: ["", Validators.required],
        NOMBRE: ["", Validators.required],
        APELLIDO1: [""],
        APELLIDO2: [""],
        GENERO: [""],
        FECHA: ["", Validators.required],
        PAIS: ["", Validators.required],
        APNFDS: ["", Validators.required],
      });
    
    this.datosForm = this.fb.group({
      EMAIL: [""],
      EMAIL_LAB: [""],
      TEL_CASA: [""],
      TEL_CEL: [""],
      TEL_TRABAJO: [""],
      RANGO_SALARIO:["", Validators.required],
      SECTOR_LAB:["", Validators.required],
      CONDICION_LAB:["", Validators.required],
      ID_USUARIO: [this.idPerson],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ id, tipo }) =>
      this.cargarPersonas(id, tipo)
    );
    this.activatedRoute.params.subscribe(({ id }) =>
      this.existeDatosPersonas(id)
    );
    this.cargarTipoGenero();
    this.cargarTipoPais();
    this.cargarTipoPersona();
   this.cargarRangoSalario();
   this.cargarCondicionLab();
   this.cargarSectorLab();
  }

  cargarPersonas(id: string, tipo: number) {
    this.cargando = true;
    this.TipoSeleccionado = tipo;
    this.personaService.getPersonaID(id, tipo).subscribe((persona: any) => {
      this.persona = persona;
      //console.log(persona)
      if (tipo != 2) {
        this.idPerson = persona.ID_FISICO;
        this.personEditForm.patchValue({
          NOMBRE: persona.NOMBRE,
          APELLIDO1: persona.APELLIDO1,
          APELLIDO2: persona.APELLIDO2,
          TIPO_PERSONA: persona.TIPO_PERSONA,
          GENERO: persona.GENERO,
          FECHA: persona.FECHA_NAC,
          PAIS: persona.PAIS_NAC,
          IDENTIFICACION: persona.IDENTIFICACION,
          APNFDS: persona.APNFDS,
        });
      } else {
        this.idPerson = persona.ID_JURIDICO;
        this.personEditForm.patchValue({
          NOMBRE: persona.RAZONSOCIAL,
          TIPO_PERSONA: persona.TIPO_PERSONA,
          FECHA: persona.FECHACONSTITUCION,
          PAIS: persona.PAISREGISTRO,
          IDENTIFICACION: persona.IDENTIFICACION,
          APNFDS: persona.APNFDS,
        });
      }
      /*this.idPerson = persona.ID_USUARIO;
          this.userUpdateForm.patchValue({
            NOMBRE:user.NOMBRE,
            APELLIDO1:user.APELLIDO1,
            APELLIDO2:user.APELLIDO2,
            EMAIL:user.EMAIL,
            ROL:user.ROL,
            ESTADO: user.ESTADO
          })*/
          this.cargando = false;
    });
  }

  cargarDatosPersonas(id: string) {
    this.cargando = true;
    this.personaService.getDatosPersonaID(id).subscribe((datos: any) => {
      this.datosPersona = datos;
      //console.log(this.datosPersona)

      this.idPerson = datos.ID_USUARIO;
      this.datosForm.patchValue({
        EMAIL: datos.EMAIL,
        EMAIL_LAB: datos.EMAIL_LAB,
        TEL_CASA: datos.TEL_CASA,
        TEL_CEL: datos.TEL_CEL,
        TEL_TRABAJO: datos.TEL_TRABAJO,
        RANGO_SALARIO:datos.RANGO_SALARIO,
        SECTOR_LAB:datos.SECTOR_LAB,
        CONDICION_LAB:datos.CONDICION_LAB
      });
      this.cargando = false;
    });
    
  }

  cargarTipoGenero() {
    this.personaService
      .cargarTipoGenero()

      .subscribe((tipoGenero) => {
        this.tipoGenero = tipoGenero;
        //console.log(this.tipoGenero)
      });
  }

  cargarTipoPais() {
    this.personaService
      .cargarTipoPais()

      .subscribe((tipoPais) => {
        this.tipoPais = tipoPais;
        //console.log(this.tipoGenero)
      });
  }

  cargarRangoSalario() {
    this.personaService
      .cargarRangoSalarial()

      .subscribe((resp:any) => {
        this.rangoSalario = resp;
        //console.log(this.tipoGenero)
      });
  }

  cargarCondicionLab() {
    this.personaService
      .cargarCondicionLaboral()

      .subscribe((resp:any) => {
        this.condicionLab = resp;
        //console.log(this.tipoGenero)
      });
  }

  cargarSectorLab() {
    this.personaService
      .cargarSectorLaboral()

      .subscribe((resp:any) => {
        this.sectorLab = resp;
        //console.log(this.tipoGenero)
      });
  }

  cargarTipoPersona() {
    this.personaService
      .cargarTipoPersona()

      .subscribe((tipoPersona: { COD_PERSONA; DESCRIPCION }) => {
        this.tipoPersona = tipoPersona;
        //console.log(this.tipoPersona)
      });
  }
  //Actualizar Usuario
  updatePersona() {
    //console.log(this.idUser);
    this.personaService
      .updatePersonaID(this.idPerson, this.personEditForm.value)
      .subscribe(
        (resp) => {
          //console.log(resp);
          SuccessDialog.fire({
            title: "Persona Actualizado Correctamente",
          });
          //this.router.navigate(['/usuario']);
        },
        (err) => {
          // Si sucede un error

          //console.log(err);
          errorDialog.fire({
            title: err.error.msg,
          });
        }
      );
  }

  existeDatosPersonas(id: string) {
    this.cargando;
    this.personaService.getExisteDatos(id).subscribe((datos: any) => {
      this.existe = datos.EXISTE;
      //console.log(datos.EXISTE)
      if (datos.EXISTE == 0) {
        this.datosForm.patchValue({
          EMAIL: "",
          EMAIL_LAB: "",
          TEL_CASA: "",
          TEL_CEL: "",
          TEL_TRABAJO: "",
          RANGO_SALARIO:1,
          SECTOR_LAB:4,
          CONDICION_LAB:3,
        });
      } else {
        this.cargarDatosPersonas(id);
      }
      this.cargando = false;
    });
  }

  ModificardatosPersona() {
    //console.log(this.idPerson);
    this.datosForm.patchValue({
      ID_USUARIO: this.idPerson,
    });
    //console.log(this.datosForm.value)
    //console.log(this.existe)
    if (this.existe != 0) {
      this.personaService
        .updateDatosPersonaID(this.idPerson, this.datosForm.value)
        .subscribe(
          (resp: any) => {
            //console.log(resp)
            if (!resp.ok) {
              if (this.datosForm.invalid) {
                Toast.fire({
                  text: resp.msg,
                });
              } else {
                errorDialog.fire({
                  text: resp.msg,
                });
              }
            } else {
              SuccessDialog.fire({
                title: "Persona Actualizada Correctamente",
              });

              this.router.navigate(["/persona"]);
            }
            this.cargando = false
          },
          (error) => {
            // Si sucede un error
            //console.error(error);
            errorDialog.fire({
              title: error.error.msg,
            });
            this.cargando = false
          }
        );
    } else {
      this.personaService
        .crearDatosPersonas(this.datosForm.value, this.idPerson)
        .subscribe(
          (resp: any) => {
            //console.log(resp)
            if (!resp.ok) {
              if (this.datosForm.invalid) {
                Toast.fire({
                  text: resp.msg,
                });
              } else {
                errorDialog.fire({
                  text: resp.msg,
                });
              }
            } else {
              SuccessDialog.fire({
                title: "Datos Persona Actualizada Correctamente",
              });

              this.router.navigate(["/persona"]);
            }
            this.cargando = false
          },
          (error) => {
            // Si sucede un error
            //console.error(error);
            errorDialog.fire({
              title: error.error.msg,
            });
            this.cargando = false
          }
        );
    }
  }

  ActualizarPersonas() {
    this.cargando;
    if(this.datosForm.invalid || this.personEditForm.invalid)
    {
      Toast.fire({
        text: "Complete todos los Campos Obligatorio",
      });
    }
    else
    {
      this.updatePersona();
      this.ModificardatosPersona();
    }
  }
}
