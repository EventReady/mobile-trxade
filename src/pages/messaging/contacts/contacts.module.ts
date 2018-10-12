import { NgModule } from '@angular/core';
import { ContactsPage } from './contacts';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from "@angular/http";

@NgModule({
	declarations: [
		ContactsPage
	],
	imports: [
		IonicPageModule.forChild( ContactsPage ),
		HttpModule
		
	],
	exports: [
		ContactsPage		
	]
})
export class ContactsPageModule{}
