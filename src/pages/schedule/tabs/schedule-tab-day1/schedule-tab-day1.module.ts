import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ScheduleTabDay1Page } from './schedule-tab-day1';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
	declarations: [ScheduleTabDay1Page],
	imports: [IonicPageModule.forChild(ScheduleTabDay1Page), SharedModule],
})
export class ScheduleTabDay1PageModule {}
