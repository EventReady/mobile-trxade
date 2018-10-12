import { NgModule } from '@angular/core';
import { WebViewPage } from './web-view';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
	declarations: [
		WebViewPage
	],
	imports: [
		IonicPageModule.forChild( WebViewPage ),
	],
	exports: [
		WebViewPage
	]
})
export class WebViewPageModule{}
