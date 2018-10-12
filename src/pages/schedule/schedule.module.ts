import { NgModule } from '@angular/core';
import { SchedulePage } from './schedule';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [SchedulePage],
	imports: [IonicPageModule.forChild(SchedulePage), HttpModule, SharedModule],
	exports: [SchedulePage],
})
export class SchedulePageModule {}
