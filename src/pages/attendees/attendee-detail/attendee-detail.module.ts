import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AttendeeDetailPage } from './attendee-detail';
import { HttpModule } from '@angular/http';

@NgModule({
	declarations: [AttendeeDetailPage],
	imports: [IonicPageModule.forChild(AttendeeDetailPage), HttpModule],
})
export class AttendeeDetailPageModule {}
