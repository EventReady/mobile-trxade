import { NgModule } from '@angular/core';
import { SurveyDetailPage } from './survey-detail';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
	declarations: [SurveyDetailPage],
	imports: [
		IonicPageModule.forChild(SurveyDetailPage),
		HttpModule,
		SharedModule,
	],
	exports: [SurveyDetailPage, HttpModule],
})
export class SurveyDetailPageModule {}
