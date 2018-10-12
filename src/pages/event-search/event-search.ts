import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	LoadingController,
	ViewController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { EventSearchService } from './event-search.service';
import { eventName } from '@app/globals';

@IonicPage()
@Component({
	selector: 'page-event-search',
	templateUrl: 'event-search.html',
	providers: [AppService, EventSearchService],
})
export class EventSearchPage {
	public output: any = [];
	public term: string = '';
	public loaded: boolean = false;
	public loadingPopup;
	public eventName: string = eventName;

	constructor(
		public viewCtrl: ViewController,
		public loadingCtrl: LoadingController,
		public navCtrl: NavController,
		private appService: AppService,
		private service: EventSearchService,
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
	** METHOD NAME - ionViewWillEnter
	**-------------------------------------------------------------------------------------
	*/
	getItems(event) {
		let term = event.value;
		this.service.eventSearch(term).subscribe((response) => {
			this.output = response.data;
			this.loaded = true;
		});
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
		this.navCtrl.push(types[type.toLowerCase()], data);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - closeModal
	**-------------------------------------------------------------------------------------
	*/
	closeModal() {
		this.navCtrl.pop();
	}
}
