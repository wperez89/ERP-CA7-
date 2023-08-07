export class archivoDig_Lista{
    constructor(
        public ID_ARCHIVO:number,
        public TIPO_DOC:string,
        public AREA:string,
        public NUM_SESION:string,
        public FECHA:Date,
        public CONVOCATORIA:string,
        public ARCHIVO:string,
        public VERSION_DOC:number,
        public ESTADO:string,
        public TIPO_AREA:string,
        public DOCUMENTO:string,
        public TIPO_CONVOC :string,
    )
    {}
}

export class archivoDigital{
    constructor(
        public ID_ARCHIVO:number,
        public TIPO_DOC:string,
        public AREA:string,
        public NUM_SESION:string,
        public FECHA:Date,
        public CONVOCATORIA:string,
        public ARCHIVO:string,
        public VERSION_DOC:number,
        public ESTADO:string,
    )
    {}
}