import { environment } from "src/environments/environment"

const base_url = environment.base_urlSql;

export class Usuario{
    constructor(
        public NOMBRE:string,
        public APELLIDO1:string,
        public EMAIL:string,
        public ESTADO:string,
        public ID_USUARIO?:string,  
        public APELLIDO2?:string,
        public PASWORD?:string,
        public IMG?:string,
        public ROL?:string,
    )
    {}
    
    get imagenUrl()
    {
        if(!this.IMG)
        {
            return `${base_url}/imagen/usuarios/no-image.jpg`;
        }
        if(this.IMG)
        {
            return `${base_url}/imagen/usuarios/${this.IMG}`;
        }
        else
        {
            return `${base_url}/imagen/usuarios/no-image.jpg`;
        }
    }
} 

export class password{
    constructor(
        public OldPass:string,
        public newPass:string,
        public confirmPass:string,
)
{}

}