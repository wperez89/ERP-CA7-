import { environment } from "src/environments/environment"

const base_url = environment.base_urlSql;

export class Persona{
    constructor(
        public TIPO_PERSONA:number,
        public IDENTIFICACION:string,
        public NOMBRE:string,
        public GENERO:number,
        public FECHA:Date,  
        public APELLIDO1:string,
        public PAIS: string,
        public APNFDS:boolean,
        public APELLIDO2?:string,
        public ID?:string,
    )
    {}
}

export class Genero{
    constructor(
        public GENERO:string,
        public ID_GENERO?:Int16Array,
)
{}

}

export class tipoPersona{
    constructor(
        public DESCRIPCION:string,
        public COD_PERSONA?:Int16Array,
)
{}

}

export class datosPersonas{
    constructor(
        public EMAIL?:string,
        public EMAIL_LAB?:string,
        public TEL_CASA?:string,
        public TEL_CEL?:string,
        public TEL_TRABAJO?:string,
        public RANGO_SALARIO?:number,
        public SECTOR_LAB?:number,
        public CONDICION_LAB?:number,
        public ID_USUARIO?:string,
)
{}
}

export class nombresPersona{
    constructor(
        public TIPO_PERSONA:number,
        public IDENTIFICACION:string,
        public NOMBRE:string,
        public ID?:string,
)
{}
}

export class ProfesionalesLista{
    constructor(
        public IDENTIFICACION:string,
        public NOMBRE:string,
        public PROFESION:string,
        public OBSERVACIONES:string,
        public ESTADO:string,
        public ID_PROFESIONAL?:string,
    )
    {}
}

export class Profesional{
    constructor(
    public ID_PROFESIONAL:string,
    public ID_PERSONA: string,
    public TIPO_PROFESION: number,
    public OBSERVACIONES: string,
    public ESTADO:string
    )
{}
}
