import { Directive } from '@angular/core';

@Directive({
  selector: '[var]',
  exportAs: 'var'
})
export class VarDirective {
  [key: string]: any;
}
