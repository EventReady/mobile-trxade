import { NgModule } from '@angular/core';
import { SpeakerDetailPage } from './speaker-detail';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from "@angular/http"
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
	declarations: [
		SpeakerDetailPage
	],
	imports: [
		IonicPageModule.forChild( SpeakerDetailPage ),
		HttpModule,
		SharedModule
	],
	exports: [
		SpeakerDetailPage
	]
})
export class SpeakerDetailPageModule{}
