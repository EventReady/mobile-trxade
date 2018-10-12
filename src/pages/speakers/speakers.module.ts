import { NgModule } from '@angular/core';
import { SpeakersPage } from './speakers';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [
		SpeakersPage
	],
	imports: [
		IonicPageModule.forChild( SpeakersPage ),
		HttpModule,
		SharedModule
	],
	exports: [
		SpeakersPage
	]
})
export class SpeakersPageModule{}
