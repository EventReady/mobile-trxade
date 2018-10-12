import { NgModule } from '@angular/core';
import { ResponseFormPage } from '@pages/messaging/response-form/response-form';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

@NgModule({
	declarations: [ResponseFormPage],
	imports: [IonicPageModule.forChild(ResponseFormPage), HttpModule],
	exports: [ResponseFormPage],
})
export class ResponseFormPageModule {}
