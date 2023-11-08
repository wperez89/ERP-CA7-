export class cupones{
    constructor(
        public ID_CUPON:string,
        public PLACA:string,
        public OBSERVACION:string,
        public ESTADO:string,
)
{}
}

export class datosCupon{
    constructor(
        public ID_CUPON:string,
        public ID_CLIENTE:string,
        public PLACA:string,
        public PERIODO:number,
        public FUNCIONARIO:string,
        public OBSERVACION:string,
        public COMPLETADO:boolean,
        public ESTADO:string,
        public EMAIL_LAB: string,
        public EMAIL: string,
)
{}
}