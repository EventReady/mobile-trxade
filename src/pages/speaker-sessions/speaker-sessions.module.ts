import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SpeakerSessionsPage } from './speaker-sessions';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [SpeakerSessionsPage],
	imports: [
		IonicPageModule.forChild(SpeakerSessionsPage),
		HttpModule,
		SharedModule,
	],
})
export class SpeakerSessionsPageModule {}
