import { NgModule } from '@angular/core';
import { ExhibitorsPage } from './exhibitors';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from "@angular/http"
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [
		ExhibitorsPage,
	],
	imports: [
		IonicPageModule.forChild( ExhibitorsPage ),
		HttpModule,
		SharedModule
	],
	exports: [
		ExhibitorsPage
	]
})
export class ExhibitorsPageModule{}
