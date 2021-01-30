import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha: Date): string {
    let fechaCorrecta = new Date(fecha);
    const dia = fechaCorrecta.getDate();
    const mes = fechaCorrecta.getMonth() + 1;
    const year = fechaCorrecta.getFullYear();
    const fechaTransfor = `${dia}/${mes}/${year}`
    return fechaTransfor;
  }

}
