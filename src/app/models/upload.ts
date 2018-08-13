export class Upload {
    $key: string;
    id:string;
    idPadre:string;
    idHijo:string;
    file: File;
    url: string;
    progress: number;
    createdOn: Date = new Date();
    name: string;
    portada:boolean;
    categoria:string;

    constructor(file: File) {
        this.file = file;
    }
}

