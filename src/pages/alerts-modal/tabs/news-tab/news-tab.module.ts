import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsTabPage } from '@pages/alerts-modal/tabs/news-tab/news-tab';
import { SharedModule } from '@shared/shared.module';
import { HttpModule } from '@angular/http';

@NgModule({
	declarations: [NewsTabPage],
	imports: [IonicPageModule.forChild(NewsTabPage), SharedModule, HttpModule],
})
export class NewsTabPageModule {}
