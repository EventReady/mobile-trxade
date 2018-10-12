import { Component } from '@angular/core';
import {
	ViewController,
	LoadingController,
	IonicPage,
	NavController,
	App,
} from 'ionic-angular';
import { ScheduleService } from '../../schedule.service';
import { AppService } from '@app/app.service';

@IonicPage()
@Component({
	selector: 'page-schedule-tab-day2',
	templateUrl: '../schedule-tab.html',
})
export class ScheduleTabDay2Page {
	public filteredList: any[];
	public start = 0;
	public end = 100;
	public day = 2;
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
		private scheduleService: ScheduleService,
		private appService: AppService,
		private app: App,
	) {
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.scheduleService.getSchedule(this.day).subscribe((response) => {
			this.loadingPopup.dismiss();
			this.schedules = response.list;
			this.loaded = true;
		});
		setTimeout(() => {
			this.loadingPopup.dismiss();
		}, 2000);
	}

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
		this.loadingPopup.present();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - cancelSearch
	**-------------------------------------------------------------------------------------
	*/
	cancelSearch(event) {
		this.isSearching = false;
		this.loaded = true;
		console.log('clear search');
		event.stopPropagation();
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
	openSchedule(
		event: Event,
		id: number,
		agenda: number,
		session: number,
		activity: number,
	): void {
		let nav = this.app.getRootNav();
		nav.push('ScheduleDetailPage', {
			scheduleId: id,
			agenda,
			session,
			activity,
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getItems
	**-------------------------------------------------------------------------------------
	*/
	getItems(event) {
		let term = event.target.value;
		if (!term) {
			return;
		}
		let loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		loadingPopup.present();
		this.scheduleService
			.getSchedule(this.day, this.start, this.end, term)
			.subscribe((response) => {
				loadingPopup.dismiss();
				this.isSearching = true;
				this.loaded = false;
				this.filteredList = response.list;
			});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - onTabChange
	**-------------------------------------------------------------------------------------
	*/
	doInfinite(event) {
		this.start = this.start + 100;
		this.end = this.end + 100;
		this.scheduleService
			.getSchedule(1, this.start, this.end)
			.subscribe((response) => {
				for (let i = 0; i < response.list.length; i++) {
					this.schedules.push(response.list[i]);
				}
				event.complete();
			});
	}
}
