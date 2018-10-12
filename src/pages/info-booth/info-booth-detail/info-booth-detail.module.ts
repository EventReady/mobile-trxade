import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoBoothDetailPage } from './info-booth-detail';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [
	InfoBoothDetailPage,
  ],
  imports: [
	IonicPageModule.forChild(InfoBoothDetailPage),
	SharedModule
  ],
  exports: [
    InfoBoothDetailPage
  ]
})
export class InfoBoothDetailPageModule {}
