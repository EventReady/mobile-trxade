import { NgModule } from '@angular/core';
import { MySchedulePage } from './my-schedule';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';
import { HttpModule } from "@angular/http";
@NgModule({
	declarations: [
		MySchedulePage
	],
	imports: [
		IonicPageModule.forChild( MySchedulePage ),
		SharedModule,
		HttpModule
	],
	exports: [
		MySchedulePage
	]
})
export class MySchedulePageModule{}
