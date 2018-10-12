import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	ToastController,
	LoadingController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { SponsorsService } from './sponsors.service';

@IonicPage()
@Component({
	selector: 'sponsors',
	templateUrl: 'sponsors.html',
	providers: [AppService, SponsorsService],
})
export class SponsorsPage {
	public loaded: boolean = false;
	public sponsors: any[];
	public profile: any;
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
		public toastCtrl: ToastController,
		private appService: AppService,
		private sponsorsService: SponsorsService,
	) {
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.sponsorsService.getSponsors().subscribe((response) => {
			this.loadingPopup.dismiss();
			this.loaded = true;
			this.sponsors = response.data.sponsors;
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
	goToDetail(sponsorId: number) {
		this.navCtrl.push('SponsorDetailPage', { sponsorId: sponsorId });
	}
}
