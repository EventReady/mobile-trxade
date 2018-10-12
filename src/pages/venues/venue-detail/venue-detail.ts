import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	LoadingController,
	ModalController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { VenuesService } from '../venues.service';

@IonicPage()
@Component({
	selector: 'venue-detail',
	templateUrl: 'venue-detail.html',
	providers: [AppService, VenuesService],
})
export class VenueDetailPage {
	public loadingPopup;
	public loaded: boolean = false;
	public venue: object;
	public venueId: number;
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
		public modalCtrl: ModalController,
		private appService: AppService,
		private venuesService: VenuesService,
	) {
		//this.venueId = this.navParams.get( 'venueId' )
		this.venueId = 80;
		if (!this.venueId) {
			this.navCtrl.push('VenuesPage');
			return;
		}
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.venuesService.getVenue(this.venueId).subscribe((response) => {
			this.loadingPopup.dismiss();
			this.loaded = true;
			this.venue = response.data.venue;
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
			noteType: 'Venue',
		});
		modal.present();
	}
}
