import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GlobalSearchPage } from './global-search';
import { HttpModule } from '@angular/http';
import { SharedModule } from '@shared/shared.module';

@NgModule({
	declarations: [GlobalSearchPage],
	imports: [
		IonicPageModule.forChild(GlobalSearchPage),
		HttpModule,
		SharedModule,
	],
})
export class GlobalSearchPageModule {}
