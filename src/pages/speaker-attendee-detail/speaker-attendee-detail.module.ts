import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeakerAttendeeDetailPage } from './speaker-attendee-detail';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [SpeakerAttendeeDetailPage],
	imports: [
		IonicPageModule.forChild(SpeakerAttendeeDetailPage),
		HttpModule,
		SharedModule,
	],
})
export class SpeakerAttendeeDetailPageModule {}
