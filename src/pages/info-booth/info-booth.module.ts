import { NgModule } from '@angular/core';
import { InfoBoothPage } from './info-booth';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';
import { HttpModule } from "@angular/http";

@NgModule({
	declarations: [
		InfoBoothPage,
	],
	imports: [
		IonicPageModule.forChild( InfoBoothPage ),
		SharedModule,
		HttpModule
	],
	exports: [
		InfoBoothPage
	]
})
export class InfoBoothPageModule{}
