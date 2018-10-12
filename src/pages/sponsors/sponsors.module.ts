import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../shared/shared.module';

import { SponsorsPage } from './sponsors';
import { SponsorsService } from './sponsors.service';
@NgModule({
	declarations: [SponsorsPage],
	imports: [IonicPageModule.forChild(SponsorsPage), HttpModule, SharedModule],
	providers: [SponsorsService],
})
export class SponsorsPageModule {}
