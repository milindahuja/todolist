/**
 * Created By : Milind Ahuja 
 */

import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlightTask]'
})
export class HighlightTaskDirective {

	constructor(private el: ElementRef) {
	}

	@HostListener('mouseenter') onMouseEnter() {
		this.highlight('gray');
	}

	@HostListener('mouseleave') onMouseLeave() {
		this.highlight(null);
	}

	private highlight(color: string) {
		this.el.nativeElement.style.backgroundColor = color;
	}
}

/**
 * Created By : Milind Ahuja 
 */
