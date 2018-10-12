import { NgModule } from '@angular/core';
import { VenuesPage } from './venues';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [
		VenuesPage,
	],
	imports: [
		IonicPageModule.forChild( VenuesPage ),
		HttpModule,
		SharedModule
	],
	exports: [
		VenuesPage,
		HttpModule
	]
})
export class VenuesPageModule{}
