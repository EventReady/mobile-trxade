import { NgModule } from '@angular/core';
import { SponsorDetailPage } from './sponsor-detail';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
	declarations: [SponsorDetailPage],
	imports: [
		IonicPageModule.forChild(SponsorDetailPage),
		HttpModule,
		SharedModule,
	],
	exports: [SponsorDetailPage],
})
export class SponsorDetailPageModule {}
