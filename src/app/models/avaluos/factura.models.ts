export class facturaProf{
    constructor(
        public ID_FACTURA:string,
        public PROFESIONAL_ID:string,
        public NUM_FACTURA:string,
        public FECHA_PAGO:Date,
        public MONTO:number,
        public METODO_PAGO:number,
        public BANCO:number,
        public REFERENCIA_FACT: string,
        public OBSERVACIONES:string,
        public DOCUMENTO: string,
        public ESTADO:string, 
    )
    {}
}

export class listaFactura{
    constructor(
        public ID_FACTURA:string,
        public PROFESIONAL_ID:string,
        public NUM_FACTURA:string,
        public FECHA_PAGO:Date,
        public MONTO:number,
        public METODO_PAGO:number,
        public BANCO:number,
        public REFERENCIA_FACT: string,
        public OBSERVACIONES:string,
        public DOCUMENTO: string,
        public ESTADO:string,
        public NOMBRE:string,
        public PROFESION:string,
    )
    {}
}