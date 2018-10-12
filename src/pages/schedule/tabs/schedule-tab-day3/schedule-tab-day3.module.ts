import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleTabDay3Page } from './schedule-tab-day3';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [ScheduleTabDay3Page],
	imports: [IonicPageModule.forChild(ScheduleTabDay3Page), SharedModule],
})
export class ScheduleTabDay3PageModule {}
