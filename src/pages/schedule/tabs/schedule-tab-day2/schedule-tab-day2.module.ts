import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleTabDay2Page } from './schedule-tab-day2';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [ScheduleTabDay2Page],
	imports: [IonicPageModule.forChild(ScheduleTabDay2Page), SharedModule],
})
export class ScheduleTabDay2PageModule {}
