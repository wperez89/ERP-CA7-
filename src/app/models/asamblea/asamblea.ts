export class tbl_Asamblea{
    constructor(
        public ID_ASAMBLEA:number,
        public DETALLE:string,
        public CSC_ASISTENCIA:number,
        public PERIODO:number,
        public ESTADO:string,
        public EDITADO:boolean
    )
    {}
}

export class listAsistenciaAsamb{
    constructor(
        public ID_ASAMBLEA:number,
        public OBSERVACION:string,
        public PALETA:number,
        public ID_ASISTENCIA:number,
        public FECHA:string,
        public ID_DELEGADO:number,
        public CONDICION:string,
        public IDENTIFICACION:string,
        public NOMBRE_COMPLETO:string,
        public EDITADO:boolean
    )
    {}
}

export class participacionList{
    constructor(
        public IDENTIFICACION:string,
        public NOMBRE_COMPLETO:string,
        public PALETA:number,
        public FECHA:string,
        public ID_ASISTENCIA:number,
        public ID_PARTICIPACION:number,
        public EDITADO:boolean
    )
    {}
}

export class delegadoActivos{
    constructor(
        public IDENTIFICACION_PROP:string,
        public IDENTIFICACION_SUPL:string,
        public NOMBRE_PROP:string,
        public NOMBRE_SUPL:string
    )
    {}
}