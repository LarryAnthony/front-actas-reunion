export interface UsuarioForm {
    nombre: string,
    apellido: string,
    fecha_nacimiento: Date,
    correo: string,
    password: string,
    id_usuario?: number,
    estado?: boolean,
    id_area?: number
};