/*
import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el: ElementRef,
    private renderer: Renderer2) { }
    @HostListener('mouseenter') onmouseenter() {
      this.renderer.addClass(this.el.nativeElement,'highlight');
    }
    @HostListener('mouseleave') onmouseleave() {
      this.renderer.removeClass(this.el.nativeElement,'highlight');
    }
}
*/
import { Directive } from '@angular/core';

@Directive({
  selector: '[var]',
  exportAs: 'var'
})
export class VarDirective {
  [key: string]: any;
}
