import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Ng4TwitterTimelineModule } from '../../shared/components/ng4-twitter-timeline';

import { ActivityFeedPage } from './activity-feed';

@NgModule({
	declarations: [
		ActivityFeedPage,
	],
	imports: [
		Ng4TwitterTimelineModule,
		IonicPageModule.forChild(ActivityFeedPage),
	],
})
export class ActivityFeedPageModule { }
