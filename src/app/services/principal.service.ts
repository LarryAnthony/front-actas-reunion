import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment.prod';
import { ProyectoForm } from '../interfaces/proyecto.interface';
import { AcuerdoForm } from '../interfaces/acuerdo.interface';
import { UsuarioProyectoForm } from '../interfaces/usuario-proyecto.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {

  public id_usuario: number;

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    };
  }

  public url = environment.url;

  constructor(public http: HttpClient) { }

  obtenerAcuerdos() {
    const project = localStorage.getItem('project');
    const URL = `${this.url}/acuerdo/${project}`;
    return this.http.get(URL, this.headers)
      .pipe(map((resp: any) => resp.data));
  }
  obtenerAcuerdosRestantes() {
    const project = localStorage.getItem('project');
    const URL = `${this.url}/acuerdo-restante/${project}`;
    return this.http.get(URL, this.headers)
      .pipe(map((resp: any) => resp.data));
  }
  obtenerProyectosPorUsuario(id: number) {
    const URL = `${this.url}/proyectos/${id}`;
    return this.http.get(URL, this.headers)
      .pipe(map((resp: any) => {
        return resp;
      }))
  }

  obtenerUsuariosProyecto() {
    const project = localStorage.getItem('project');
    const URL = `${this.url}/usuario-proyecto/${project}`;
    return this.http.get(URL, this.headers)
      .pipe(map((resp: any) => resp.data));
  }
  obtenerUsuariosProyectoActivos() {
    const project = localStorage.getItem('project');
    const URL = `${this.url}/usuario-proyecto-activos/${project}`;
    return this.http.get(URL, this.headers)
      .pipe(map((resp: any) => resp.data));
  }

  validarToken() {
    const token = localStorage.getItem('token');
    const URL = `${this.url}/usuario/validarToken`;
    return this.http.post(URL, { token })
      .pipe(map((resp: any) => {
        this.id_usuario = resp.id_usuario;
        localStorage.setItem('token', resp.token);
        return resp;
      }));
  }

  validarTokenGuard(): Observable<boolean> {
    const token = localStorage.getItem('token');
    const URL = `${this.url}/usuario/validarToken`;
    return this.http.post(URL, { token })
      .pipe(map((resp: any) => {
        this.id_usuario = resp.id_usuario;
        if (!resp) {
          return false
        }
        return true;
      }), catchError(error => of(false)));
  }

  crearProyecto(formData: ProyectoForm) {
    const URL = `${this.url}/proyecto`;
    return this.http.post(URL, formData, this.headers)
      .pipe(map((resp: any) => {
        return resp
      }));
  }

  crearUsuarioProyecto(formData: UsuarioProyectoForm) {
    const proyect = localStorage.getItem('project');
    const URL = `${this.url}/usuario-proyecto/${proyect}`;
    return this.http.post(URL, formData, this.headers)
      .pipe(map((resp: any) => {

      }));
  }
  crearUsuarioProyectoInicio(formData: UsuarioProyectoForm, id: number) {
    formData.id_usuario = this.id_usuario;
    const proyect = localStorage.getItem('project');
    const URL = `${this.url}/usuario-proyecto/${id}`;
    return this.http.post(URL, formData, this.headers)
      .pipe(map((resp: any) => {
      }));
  }

  obtenerUsuarios() {
    const URL = `${this.url}/usuario`;
    return this.http.get(URL, this.headers)
      .pipe(map((resp: any) => {
        return resp.data
      }))
  }

  crearAcuerdo(formData: AcuerdoForm) {
    const proyect = localStorage.getItem('project');
    const URL = `${this.url}/acuerdo/${proyect}`;
    return this.http.post(URL, formData, this.headers)
      .pipe(map(resp => {
        return resp;
      }))
  }
  cambiarEstadoUsuarioProyecto(usuarioProyecto) {
    const URL = `${this.url}/usuario-proyecto/${usuarioProyecto}`;
    return this.http.put(URL, {}, this.headers)
      .pipe(map(resp => {

      }));
  }

  actualizarProyecto(formData: ProyectoForm) {
    const proyect = localStorage.getItem('project');
    const URL = `${this.url}/proyecto/${proyect}`;
    return this.http.put(URL, formData, this.headers)
      .pipe(map(resp => {
        return resp
      }));
  }
  obtenerProyecto() {
    const proyect = localStorage.getItem('project');
    const URL = `${this.url}/proyecto/${proyect}`;
    return this.http.get(URL, this.headers)
      .pipe(map((resp: any) => {
        return resp
      }))
  }

  actualizarAcuerdo(formData: AcuerdoForm) {
    const id_acuerdo = localStorage.getItem('acuerdo');
    const URL = `${this.url}/acuerdo/${id_acuerdo}`;

    return this.http.put(URL, formData, this.headers)
      .pipe(map(resp => {
        return resp;
      }))
  }

  enviarCorreo(correos: string, cuerpo: string) {
    const URL = `${this.url}/email`;
    const fecha = new Date();
    const fechaFormato = `${fecha.getDate()}-${fecha.getMonth() + 1}-${fecha.getFullYear()}`
    const asunto = `Acta de reunión ${fechaFormato}`
    return this.http.post(URL, { asunto: asunto, remitentes: correos, cuerpo: cuerpo }, this.headers)
      .pipe(map(resp => {
        return resp;
      }))
  }
}
