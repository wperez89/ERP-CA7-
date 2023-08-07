export class areaDocumental{
    constructor(
        public ID_AREADOC:number,
        public NOMBRE:string,
        public ESTADO:string,
    )
    {}
}

export class tipoDocumento{
    constructor(
        public ID_TIPODOC:number,
        public NOMBRE:string,
        public ESTADO:string,
    )
    {}
}

export class tipoConvocatoria{
    constructor(
        public ID_CONVOCATORIA:number,
        public NOMBRE:string,
        public ESTADO:string,
    )
    {}
}