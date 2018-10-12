import { NgModule } from '@angular/core';
import { WhatsOnPage } from './whats-on';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';
import { HttpModule } from "@angular/http";

@NgModule({
	declarations: [
		WhatsOnPage,
	],
	imports: [
		IonicPageModule.forChild( WhatsOnPage ),
		SharedModule,
		HttpModule
	],
	exports: [
		WhatsOnPage
	]
})
export class WhatsOnPageModule{}
