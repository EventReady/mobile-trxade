import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	LoadingController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { AttendeesService } from './attendees.service';
import * as _ from 'lodash';

@IonicPage()
@Component({
	selector: 'attendees',
	templateUrl: 'attendees.html',
	providers: [AppService, AttendeesService],
})
export class AttendeesPage {
	public activeTab: string = 'CXXX';
	public start = 0;
	public end = 100;
	public loaded: boolean = false;
	public attendees: any[];
	public filteredList: any[];
	public isSearching: boolean = false;

	public loadingPopup;
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - constructor
	**-------------------------------------------------------------------------------------
	*/
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		public viewCtrl: ViewController,
		private appService: AppService,
		private attendeesService: AttendeesService,
	) {
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.attendeesService
			.getAttendees(this.start, this.end)
			.subscribe((response) => {
				this.loadingPopup.dismiss();
				this.loaded = true;
				this.attendees = response.data.attendees;
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
	** METHOD NAME - cancelSearch
	**-------------------------------------------------------------------------------------
	*/
	cancelSearch(event) {
		let loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		loadingPopup.present();
		this.isSearching = false;
		this.loaded = true;
		this.start = 0;
		this.end = 100;
		this.attendeesService
			.getAttendees(this.start, this.end)
			.subscribe((response) => {
				loadingPopup.dismiss();
				this.loaded = true;
				this.attendees = response.data.attendees;
			});
		event.stopPropagation();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getItems
	**-------------------------------------------------------------------------------------
	*/
	getItems(event) {
		let term = event.target.value;
		if (_.isUndefined(term)) {
			return;
		}
		let loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		loadingPopup.present();
		this.attendeesService
			.getAttendees(this.start, this.end, term)
			.subscribe((response) => {
				loadingPopup.dismiss();
				this.isSearching = true;
				this.loaded = false;
				this.filteredList = response.data.attendees;
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
		this.attendeesService
			.getAttendees(this.start, this.end)
			.subscribe((response) => {
				for (let i = 0; i < response.data.attendees.length; i++) {
					this.attendees.push(response.data.attendees[i]);
				}
				event.complete();
			});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToPage
 	**-------------------------------------------------------------------------------------
	*/
	goToPage(data) {
		this.navCtrl.push('AttendeeDetailPage', {
			attendeeId: data.reg_id,
		});
	}
}
