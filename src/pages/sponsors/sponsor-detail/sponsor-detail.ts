import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ModalController,
	ViewController,
	NavParams,
	LoadingController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { SponsorsService } from '../sponsors.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
	selector: 'sponsor-detail',
	templateUrl: 'sponsor-detail.html',
	providers: [AppService, SponsorsService, InAppBrowser],
})
export class SponsorDetailPage {
	public loadingPopup;
	public loaded: boolean = false;
	public sponsor: object;
	public sponsorId: number;
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
		private iab: InAppBrowser,
		public modalCtrl: ModalController,
		private appService: AppService,
		private sponsorsService: SponsorsService,
	) {
		this.sponsorId = this.navParams.get('sponsorId');
		if (!this.sponsorId) {
			this.navCtrl.push('SponsorsPage');
			return;
		}
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.sponsorsService
			.getSponsor(this.sponsorId)
			.subscribe((response) => {
				this.loadingPopup.dismiss();
				this.loaded = true;
				this.sponsor = response.data.sponsor[0];
				console.log(this.sponsor);
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
	** METHOD NAME - addNote
	** DESC - This will add a note
	**-------------------------------------------------------------------------------------
	*/
	addNote() {
		let modal = this.modalCtrl.create('NotesModalPage', {
			noteType: 'Sponsor',
		});
		modal.present();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToSponsor
	**-------------------------------------------------------------------------------------
	*/
	goToSponsor(url) {
		this.iab.create(url, '_blank', {
			location: 'no',
		});
	}
}
