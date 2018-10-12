import { Component } from '@angular/core';
import {
	IonicPage,
	ViewController,
	LoadingController,
	NavController,
	App,
} from 'ionic-angular';
import { ScheduleService } from './schedule.service';
import { AppService } from '@app/app.service';
import { scheduleDays } from '@app/globals';
@IonicPage()
@Component({
	selector: 'schedule',
	templateUrl: 'schedule.html',
	providers: [ScheduleService, AppService],
})
export class SchedulePage {
	public activeTab: string = 'day1';
	public schedules = {
		days: [],
		list: {},
	};
	public filteredList: any[];
	public loaded: boolean = false;
	public isSearching: boolean = false;
	public loadingPopup;
	public scheduleDays: any[] = scheduleDays;
	tab1Root: string = 'ScheduleTabDay1Page';
	tab2Root: string = 'ScheduleTabDay2Page';
	tab3Root: string = 'ScheduleTabDay3Page';
	tab4Root: string = 'ScheduleTabDay4Page';
	tab5Root: string = 'ScheduleTabDay5Page';

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
		private app: App,
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
	ionViewWillLoad(): void {
		this.viewCtrl.showBackButton(true);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - backToDashboard
	**-------------------------------------------------------------------------------------
	*/
	backToDashboard() {
		let nav = this.app.getRootNav();
		nav.push('DashboardPage');
	}
}
