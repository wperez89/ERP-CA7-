export class VehiculoLista{
    constructor(
        public ID_VEHICULO:number,
        public MARCA:string,
        public MODELO:string,
        public PLACA:string,
        public ANIO:number,
        public ESTADO:string,
    )
    {}
}

export class conductor{
    constructor(
        public ID_CONDUCTOR:number,
        public ID_PERSONA:string,
        public EXPEDICION: Date,
        public VENCIMIENTO:Date,
        public TIPO_LIC:string,
        public OBSERVACION: string,
        public IMG:string,
        public ESTADO:string,
        public ID:string,
        public NOMBRE:string,
    )
    {}
}

export class MotivoSalidaVeh{
    constructor(
        public ID_MOTIVO:number,
        public DESCRIPCION:string,
        public ESTADO:string,
    )
    {}
}

export class estadoSolVeh{
    constructor(
        public IDESTADO:number,
        public NOMBRE:string,
    )
    {}
}

export class listaSolicitud{
    constructor(
        public NUM_SOLICITUD:string,
        public SOLICITANTE:string,
        public FECHA_SOLICITUD:Date,
        public ESTADO:string,
        public ID_SOLIC:string,
        public ID_ESTADO:number,
    )
    {}
}

export class SolicitudVeh{
    constructor(
        public NUM_SOLICITUD:string,
        public ID_SOLICITANTE:string,
        public AREA:number,
        public CONDUCTOR:number,
        public FECHA_SALIDA:Date,
        public FECHA_REGRESO:Date,
        public MOTIVO_SALIDA:number,
        public DESTINO:string,
        public OBSERVACIONES:string,
        public ESTADO:number,
        public EDITADO:boolean
    )
    {}
}
export class pasajerosVeh{
    constructor(
       public ID_PASAJERO:number,
       public ID_PERSONA:string,
       public ID_VIAJE:string,
       public OBSERVACION:string,
       public ESTADO:string,
       public NOMBRE:string,
       public IDENTIFICACION: string
    )
    {}
}

export class trscnSolicitudVeh{
    constructor(
       public ID_TRAN:number,
       public NUM_SOLICITUD:string,
       public ESTADO_ANT:number,
       public ESTADO_ACT:number,
       public DETALLE:string,
       public USUARIO:string,
       public NOM_USER:string,
       public ESTADO_VIEJO: string,
       public ESTADO_NUEVO: string,
       public FECHA: string
    )
    {}
}

export class aprobadoresSolVeh{
    constructor(
        public ID_APROBADOR:string,
        public APROBADOR:string,
        public NOMBRE:string,
        public ESTADO:string,
        public CEDULA:string,
        public ESTADO_NOMBRE:number,
    )
    {}
}