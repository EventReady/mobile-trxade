import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventSearchPage } from './event-search';
import { HttpModule } from '@angular/http';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [EventSearchPage],
	imports: [
		IonicPageModule.forChild(EventSearchPage),
		HttpModule,
		SharedModule,
	],
})
export class EventSearchPageModule {}
