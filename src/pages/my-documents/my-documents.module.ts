import { NgModule } from '@angular/core';
import { MyDocumentsPage } from './my-documents';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '@shared/shared.module';
import { HttpModule } from '@angular/http';

@NgModule({
	declarations: [MyDocumentsPage],
	imports: [
		IonicPageModule.forChild(MyDocumentsPage),
		SharedModule,
		HttpModule,
	],
	exports: [MyDocumentsPage],
})
export class MyDocumentsPageModule {}
