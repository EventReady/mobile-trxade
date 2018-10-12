import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	LoadingController,
	ViewController,
	NavParams,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { DashboardService } from '@pages/dashboard/dashboard-service';
import { eventName } from '@app/globals';
@IonicPage()
@Component({
	selector: 'page-global-search',
	templateUrl: 'global-search.html',
	providers: [DashboardService],
})
export class GlobalSearchPage {
	public output: any = [];
	public term: string = '';
	public loaded: boolean = false;
	public loadingPopup;
	public eventName: string = eventName;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		public viewCtrl: ViewController,
		private appService: AppService,
		private service: DashboardService,
	) {
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.term = this.navParams.get('term');
		this.service.globalSearch(this.term).subscribe((response) => {
			this.output = response.data;
			this.loadingPopup.dismiss();
			this.loaded = true;
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewWillLoad
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
	** METHOD NAME - goToPage
 	**-------------------------------------------------------------------------------------
	*/
	goToPage(type, item) {
		let types = {
			attendees: 'AttendeeDetailPage',
			exhibitors: 'ExhibitorDetailPage',
			speakers: 'SpeakerDetailPage',
			sponsors: 'SponsorDetailPage',
			schedules: 'ScheduleDetailPage',
		};
		let data = {};
		if (type.toLowerCase() === 'attendees') {
			data['attendeeId'] = item.reg_id;
		}
		if (type.toLowerCase() === 'exhibitors') {
			data['exhibId'] = item.exhib_id;
		}
		if (type.toLowerCase() === 'speakers') {
			data['speakerId'] = item.speaker_id;
		}
		if (type.toLowerCase() === 'sponsors') {
			data['sponsorId'] = item.id;
		}
		if (type.toLowerCase() === 'schedules') {
			data['scheduleId'] = item.session_id;
			data['session'] = 1;
			data['activity'] = 0;
			data['agenda'] = 0;
		}
		console.log(types, type, data);
		this.navCtrl.push(types[type.toLowerCase()], data);
	}
}
