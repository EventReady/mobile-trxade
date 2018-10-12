import { NgModule } from '@angular/core';
import { MyProfilePage } from './my-profile';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [
		MyProfilePage,
	],
	imports: [
		IonicPageModule.forChild( MyProfilePage ),
		SharedModule
	],
	exports: [
		MyProfilePage
	]
})
export class MyProfilePageModule {}
