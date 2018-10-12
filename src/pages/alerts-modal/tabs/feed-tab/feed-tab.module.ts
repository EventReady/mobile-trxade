import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedTabPage } from '@pages/alerts-modal/tabs/feed-tab/feed-tab';

@NgModule({
	declarations: [FeedTabPage],
	imports: [IonicPageModule.forChild(FeedTabPage)],
})
export class FeedTabPageModule {}
