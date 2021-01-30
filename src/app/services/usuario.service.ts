import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { LoginForm } from '../interfaces/login-form.interface';
import { tap, map } from 'rxjs/operators';
import { UsuarioForm } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  public url = environment.url
  constructor(public http: HttpClient) { }

  login(formData: LoginForm) {
    const URL = `${this.url}/login`;
    return this.http.post(URL, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        }));
  }

  registrar(formData: UsuarioForm) {
    const URL = `${this.url}/usuario`;
    return this.http.post(URL, formData)
      .pipe(map(resp => {
        return resp;
      }))
  }

}
