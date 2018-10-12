import { Component } from '@angular/core';
import {
	ViewController,
	LoadingController,
	IonicPage,
	NavController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { isDemo } from '@app/globals';
import { feeds } from './feed-data';

@IonicPage()
@Component({
	selector: 'page-feed-tab',
	templateUrl: 'feed-tab.html',
})
export class FeedTabPage {
	public feeds: any[] = feeds;
	public isDemo: boolean = isDemo;
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - constructor
	**-------------------------------------------------------------------------------------
	*/
	constructor(
		public viewCtrl: ViewController,
		public loadingCtrl: LoadingController,
		public navCtrl: NavController,
		private appService: AppService,
	) {}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewCanEnter
	**-------------------------------------------------------------------------------------
	*/
	ionViewCanEnter(): Promise<any> {
		return this.appService.getLoggedIn();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewWillLoad
	**-------------------------------------------------------------------------------------
	*/
	ionViewWillLoad(): void {}
}
