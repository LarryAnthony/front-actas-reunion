import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha'
})
export class FechaPipe implements PipeTransform {

  transform(fecha: Date): string {
    let fechaCorrecta = new Date(fecha);

    let nuevaFecha = new Date(fechaCorrecta).setDate((new Date(fechaCorrecta)).getDate() + 1);
    let nuevaFecha2 = formatDate(nuevaFecha, 'dd-MM-yyyy', 'es-ES');
    return nuevaFecha2;
  }

}
