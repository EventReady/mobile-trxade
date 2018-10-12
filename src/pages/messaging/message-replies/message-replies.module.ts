import { NgModule } from '@angular/core';
import { MessageRepliesPage } from '@pages/messaging/message-replies/message-replies';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

@NgModule({
	declarations: [MessageRepliesPage],
	imports: [IonicPageModule.forChild(MessageRepliesPage), HttpModule],
	exports: [MessageRepliesPage],
})
export class MessageRepliesPageModule {}
