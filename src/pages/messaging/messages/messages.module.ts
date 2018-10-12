import { NgModule } from '@angular/core';
import { MessagesPage } from './messages';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '../../../shared/shared.module';
import { HttpModule } from '@angular/http';

@NgModule({
	declarations: [MessagesPage],
	imports: [IonicPageModule.forChild(MessagesPage), SharedModule, HttpModule],
	exports: [MessagesPage],
})
export class MessagesPageModule {}
