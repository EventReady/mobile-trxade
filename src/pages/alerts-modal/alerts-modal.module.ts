import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertsModalPage } from './alerts-modal';
import { MessagesTab } from './messages.component';
@NgModule({
	declarations: [AlertsModalPage, MessagesTab],
	imports: [IonicPageModule.forChild(AlertsModalPage)],
})
export class AlertsModalPageModule {}
