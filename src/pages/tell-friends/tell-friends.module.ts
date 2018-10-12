import { NgModule } from '@angular/core';
import { TellFriendsPage } from './tell-friends';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [
		TellFriendsPage,
		
	],
	imports: [
		IonicPageModule.forChild( TellFriendsPage ),
		SharedModule
	],
	exports: [
		TellFriendsPage
	]
})
export class BoilerplatePageModule{}
