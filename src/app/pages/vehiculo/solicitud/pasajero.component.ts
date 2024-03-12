import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { SuccessDialog, Toast, errorDialog } from "src/app/helpers/Notificaciones";

import {
  listaSolicitud,
  pasajerosVeh,
} from "src/app/models/vehiculos/tablasVehiculo.models";
import { PersonasService } from "src/app/services/personas.service";
import { VehiculoService } from "src/app/services/vehiculo.service";

@Component({
  selector: "app-solicitud",
  templateUrl: "./pasajero.component.html",
  styleUrls: ["./solicitud.component.scss"],
})
export class PasajeroComponent implements OnInit {
  public pasajeros: pasajerosVeh[] = [];
  public pasajeroForm: FormGroup;
  public cargando: boolean = true;
  public idSolicitud: string = "";
  public id = "";
  public idEstado: number;
  public editado: boolean = false;

  constructor(
    private vehiculoService: VehiculoService,
    public modalService: NgbModal,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private personaService: PersonasService
  ) {
    this.pasajeroForm = this.fb.group({
      ID_PASAJERO: [""],
      CEDULA: ["", Validators.required],
      NOMBRE: ["", Validators.required],
      ID_PERSONA: ["", Validators.required],
      OBSERVACION: [""],
      ID_VIAJE: ["", Validators.required],
      ESTADO: ["A"],
      EDITADO: [false],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params["num_sol"] && params["estado"]) {
        this.idSolicitud = params["num_sol"];
        this.idEstado = params["estado"];
      }
    });
    this.cargarPasajero();
    //console.log(this.idEstado);
  }

  cargarPasajero() {
    this.cargando = true;
    this.vehiculoService
      .cargarPasajerosIDViaje(this.idSolicitud)
      .subscribe((resp: any) => {
        this.pasajeros = resp;
        //console.log(this.pasajeros);
        this.cargando = false;
      });
  }

  modalOpenBackdrop(modal: any) {
    this.modalService.open(modal, {
      backdrop: false,
      centered: true,
      //fullscreen:true
      size: "xl",
    });
  }

  cerrarModal(modalEdit: any) {
    this.pasajeroForm.reset();
    this.modalService.dismissAll(modalEdit);
    this.id = "";
  }

  mostrarPersona() {
    this.cargando;
    this.id = this.pasajeroForm.get("CEDULA").value;
    //console.log()
    this.personaService
      .getNombresPersonabyCedula(this.id)
      .subscribe((resp: any) => {
        //console.log(resp);
        if (!resp.ok) {
          Toast.fire({
            text: resp.msg,
          });
          this.pasajeroForm.reset();
          this.id = "";
          return;
        }
        this.pasajeroForm.patchValue({
          NOMBRE: resp.persona[0].NOMBRE,
          ID_PERSONA: resp.persona[0].ID,
          ID_VIAJE: this.idSolicitud,
          ESTADO: "A",
        });
        this.cargando = false;
      });
  }

  createPasajero(modalEdit: any) {
    this.cargando;
    if (this.pasajeroForm.invalid) {
      Toast.fire({
        text: "Completar Información del Formulario",
      });
      return;
    }
    //console.log(this.documentDigitalForm.value)
    this.vehiculoService
      .crearPasajeros(this.pasajeroForm.value)
      .subscribe((resp: any) => {
        //console.log(resp)
        if (!resp.ok) {
          Toast.fire({
            text: resp.msg,
          });
        } else {
          SuccessDialog.fire({
            text: resp.msg,
          });
          this.cargarPasajero();
          this.cargando = false;
          this.cerrarModal(modalEdit);
          this.pasajeroForm.reset();
          this.id = "";
        }
      },
      (error) => { // Si sucede un error
        errorDialog.fire(
          {
            text:(error.msg)
          }
          )
          //console.error(error);
        });
  }

  obtenerPasajeroID(modalEditUser: any, id: number) {
    this.cargando;
    this.editado = true;
    this.vehiculoService.cargarPasajerosID(id).subscribe((resp: any) => {
      this.pasajeroForm.patchValue({
        ESTADO: resp[0].ESTADO,
        EDITADO: this.editado,
        NOMBRE: resp[0].NOMBRE,
        OBSERVACION: resp[0].OBSERVACION,
        ID_PASAJERO: id,
        ID_VIAJE: resp[0].ID_VIAJE,
        CEDULA: resp[0].IDENTIFICACION,
        ID_PERSONA: resp[0].ID_PERSONA,
      });
      this.id = resp[0].IDENTIFICACION;
      //console.log(this.vehiculoForm.value);
      this.cargando = false;
    });
    this.modalService.open(modalEditUser, {
      backdrop: false,
      centered: true,
    });
  }

  evitarSubmit(event: KeyboardEvent) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }
}
