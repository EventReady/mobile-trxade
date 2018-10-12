import { Directive, ElementRef, Renderer, Input, HostListener } from '@angular/core';
import { NavController } from 'ionic-angular';

@Directive({
	selector: '[eventReadyNavigate]'
})

export class NavigateDirective {
	
	@Input( "page" ) page: string; 

	@HostListener( "click", [ "$event" ] ) onClick( target ): void {
		this.navCtrl.push( this.page ); 
		return;
	}
		

	constructor(
		public element: ElementRef, 
		public renderer: Renderer,
		public navCtrl: NavController
	){
		console.log( "navigation directive" );
	}
}
