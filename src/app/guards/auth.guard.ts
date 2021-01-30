import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrincipalService } from '../services/principal.service';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private principalService: PrincipalService, private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.principalService.validarTokenGuard()
      .pipe(
        tap(estaAutenticado => {
          if (!estaAutenticado) {
            this.router.navigateByUrl('/login');
          }
        })
      );
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    return this.principalService.validarTokenGuard()
      .pipe(tap(estaAutenticado => {
        if (!estaAutenticado) {
          this.router.navigateByUrl('/login')
        }
      }));
  }

}
