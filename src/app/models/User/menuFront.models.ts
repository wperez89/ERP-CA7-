import { environment } from "src/environments/environment"

const base_url = environment.base_urlSql;

export class Menu{
    constructor(
        public ID:number,
        public LINK:string,
        public TITLE:string,
        public CLASS:string,
        public ICON:string,
        public EXTRALINK:boolean,  
        public parent_id:number,
        public PARENT_TITLE?:string,
    )
    {}
}