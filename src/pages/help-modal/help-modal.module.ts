import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpModalPage } from '@pages/help-modal/help-modal';
import { HttpModule } from '@angular/http';

@NgModule({
	declarations: [HelpModalPage],
	imports: [IonicPageModule.forChild(HelpModalPage), HttpModule],
	exports: [HelpModalPage],
})
export class HelpModalPageModule {}
