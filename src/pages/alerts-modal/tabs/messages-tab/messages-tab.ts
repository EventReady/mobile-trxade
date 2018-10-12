import { Component } from '@angular/core';
import {
	ViewController,
	LoadingController,
	IonicPage,
	NavController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';

@IonicPage()
@Component({
	selector: 'page-messages-tab',
	templateUrl: 'messages-tab.html',
})
export class messagesTabPage {
	public filteredList: any[];
	public start = 0;
	public end = 100;
	public day = 1;
	public loaded: boolean = false;
	public isSearching: boolean = false;
	public schedules: any[];
	public loadingPopup;

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
