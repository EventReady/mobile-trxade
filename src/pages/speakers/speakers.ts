import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	LoadingController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { SpeakerService } from './speakers.service';
import * as _ from 'lodash';

@IonicPage()
@Component({
	selector: 'speakers',
	templateUrl: 'speakers.html',
	providers: [AppService, SpeakerService],
})
export class SpeakersPage {
	public loaded: boolean = false;
	public filteredList: any[];
	public speakers: any[];
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
		private speakerService: SpeakerService,
	) {
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.speakerService.getSpeakers().subscribe((response) => {
			this.loadingPopup.dismiss();
			this.loaded = true;
			this.speakers = response.data.speakers;
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
	** METHOD NAME - goToDetail
	** DESC - this will take the user to the detail page
	**-------------------------------------------------------------------------------------
	*/
	goToDetail(speakerId: number) {
		this.navCtrl.push('SpeakerDetailPage', { speakerId: speakerId });
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
	** METHOD NAME - getItems
	**-------------------------------------------------------------------------------------
	*/
	getItems(event) {
		let term = event.target.value;
		if (_.isUndefined(term)) {
			return;
		}
		let list = [];
		list = this.speakers.filter((item) => {
			const full = `${item.first_name} ${item.last_name}`;
			return full.toLowerCase().indexOf(term.toLowerCase()) > -1;
		});
		this.isSearching = true;
		this.loaded = false;
		this.filteredList = list;
	}
}
