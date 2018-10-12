import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { messagesTabPage } from './messages-tab';

@NgModule({
	declarations: [messagesTabPage],
	imports: [IonicPageModule.forChild(messagesTabPage)],
})
export class MessageTabPageModule {}
