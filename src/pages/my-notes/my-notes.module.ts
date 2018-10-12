import { NgModule } from '@angular/core';
import { MyNotesPage } from './my-notes';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';
import { HttpModule } from "@angular/http";

@NgModule({
	declarations: [
		MyNotesPage	
	],
	imports: [
		IonicPageModule.forChild( MyNotesPage ),
		SharedModule,
		HttpModule
	],
	exports: [
		MyNotesPage
	]
})
export class MyNotesPageModule{}
