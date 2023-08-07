export class ctznLista{
    constructor(
        public ID_COTIZACION:string,
        public ID_AVALUO:string,
        public ID_PERSONA:string,
        public IDENTIFICACION:string,
        public FECHA_CTZCN:Date,
        public NOMBRE:string,
        public MONTO:number,
        public ASIGNADO: boolean,
        public ESTADO:string, 
    )
    {}
}

export class cotizacion{
    constructor(
        public ID_COTIZACION:string,
        public ID_AVALUO:string,
        public TIPO_CTZCN:number,
        public FECHA_CTZCN:Date,
        public PROFESIONAL:string,
        public MONTO:number,
        public DOC_CTZCN: string,
        public ASIGNADO: boolean,
        public OBSERVACIONES:string,
        public ESTADO:string, 
    )
    {}
}

export class cotizacionnNew{
    constructor(
        public ID_AVALUO:string,
        public TIPO_CTZCN:number,
        public PROFESIONAL:string,
        public MONTO:number,
        public ASIGNADO: boolean,
        public OBSERVACIONES:string,
    )
    {}
}