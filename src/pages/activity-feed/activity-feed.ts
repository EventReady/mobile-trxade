import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Ng4TwitterTimelineService } from 'ng4-twitter-timeline/lib/index';
import { AppService } from '@app/app.service';

@IonicPage()
@Component({
	selector: 'page-activity-feed',
	templateUrl: 'activity-feed.html',
	providers: [Ng4TwitterTimelineService],
})
export class ActivityFeedPage {
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private appService: AppService,
	) {}

	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewWillLoad
	**-------------------------------------------------------------------------------------
	*/
	ionViewCanEnter(): Promise<any> {
		return this.appService.getLoggedIn();
	}
}
