import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendeesPage } from './attendees';
import { HttpModule } from "@angular/http"
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [
		AttendeesPage,
	],
	imports: [
		IonicPageModule.forChild(AttendeesPage),
		HttpModule,
		SharedModule
	],
})
export class AttendeesPageModule { }
