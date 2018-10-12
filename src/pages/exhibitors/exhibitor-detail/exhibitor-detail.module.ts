import { NgModule } from '@angular/core';
import { ExhibitorDetailPage } from './exhibitor-detail';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from "@angular/http"
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
	declarations: [
		ExhibitorDetailPage,
	],
	imports: [
		IonicPageModule.forChild( ExhibitorDetailPage ),
		HttpModule,
		SharedModule
	],
	exports: [
		ExhibitorDetailPage
	]
})
export class ExhibitorDetailPageModule{}
