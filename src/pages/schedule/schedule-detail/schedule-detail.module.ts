import { NgModule } from '@angular/core';
import { ScheduleDetailPage } from './schedule-detail';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from "@angular/http"
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
	declarations: [
		ScheduleDetailPage
	],
	imports: [
		IonicPageModule.forChild( ScheduleDetailPage ),
		HttpModule,
		SharedModule
	],
	exports: [
		ScheduleDetailPage
	]
})
export class ScheduleDetailPageModule{}
