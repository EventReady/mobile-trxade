import { NgModule } from '@angular/core';
import { DocumentsPage } from './documents';
import { IonicPageModule } from 'ionic-angular';
import { SharedModule } from '@shared/shared.module';
import { HttpModule } from '@angular/http';

@NgModule({
	declarations: [DocumentsPage],
	imports: [
		IonicPageModule.forChild(DocumentsPage),
		SharedModule,
		HttpModule,
	],
	exports: [DocumentsPage],
})
export class DocumentsPageModule {}
