import { NgModule } from '@angular/core';
import { LoginPage } from './login';
import { IonicPageModule } from 'ionic-angular';
import {HttpModule} from '@angular/http';

@NgModule({
	declarations: [
		LoginPage
	],
	imports: [
		IonicPageModule.forChild( LoginPage ),
		HttpModule
	],
	exports: [
		LoginPage
	],
	providers: [  ]
})
export class LoginPageModule {}
