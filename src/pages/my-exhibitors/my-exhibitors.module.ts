import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyExhibitorsPage } from './my-exhibitors';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [MyExhibitorsPage],
	imports: [
		IonicPageModule.forChild(MyExhibitorsPage),
		HttpModule,
		SharedModule,
	],
})
export class MyExhibitorsPageModule {}
