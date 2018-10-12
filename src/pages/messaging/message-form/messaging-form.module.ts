import { NgModule } from '@angular/core';
import { MessagingFormPage } from './messaging-form';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../../shared/shared.module';
import { HttpModule } from '@angular/http';

@NgModule({
	declarations: [MessagingFormPage],
	imports: [
		IonicPageModule.forChild(MessagingFormPage),
		SharedModule,
		HttpModule,
	],
	exports: [MessagingFormPage],
})
export class MessagingFormPageModule {}
