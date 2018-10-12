import { NgModule } from '@angular/core';
import { VenueDetailPage } from './venue-detail';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
	declarations: [
		VenueDetailPage
	],
	imports: [
		IonicPageModule.forChild( VenueDetailPage ),
		HttpModule,
		SharedModule
	],
	exports: [
		VenueDetailPage,
		HttpModule
	]
})
export class VenueDetailPageModule{}
