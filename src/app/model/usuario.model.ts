export class Usuario {
    constructor(
        public nombre: string,
        public correo: string,
        public apellido: string,
        public estado: boolean,
        public fecha_nacimiento: Date,
        public nombre_apellido: string,
        public password?: string,
        public id_usuario?: number,
        public id_area?: number,
    ) { }
}
