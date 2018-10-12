import { NgModule } from '@angular/core';
import { SurveysPage } from './surveys';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
	declarations: [SurveysPage],
	imports: [IonicPageModule.forChild(SurveysPage), HttpModule, SharedModule],
	exports: [SurveysPage, HttpModule],
})
export class SurveysPageModule {}
