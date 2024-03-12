import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoMoneda'
})
export class FormatoMonedaPipe implements PipeTransform {

  transform(value: number): string {
    return value.toLocaleString('es-CR', { style: 'currency', currency: 'CRC' });
  }

}
