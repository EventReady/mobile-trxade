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
import { ExhibitorService } from '../exhibitors/exhibitors.service';
@IonicPage()
@Component({
	selector: 'my-exhibitors',
	templateUrl: 'my-exhibitors.html',
	providers: [AppService, ExhibitorService],
})
export class MyExhibitorsPage {
	public loaded: boolean = false;
	public exhibitors: any[];
	public filteredList: any[];
	public isSearching: boolean = false;
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
		private exhibitorService: ExhibitorService,
	) {
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.appService.getRegistrationData().then((data) => {
			this.profile = JSON.parse(data);
			this.exhibitorService
				.getMyExhibitors(this.profile.reg_id)
				.subscribe((response) => {
					this.loadingPopup.dismiss();
					this.loaded = true;
					this.exhibitors = response.data.exhibitors;
				});
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
	goToDetail(exhibId: number) {
		this.navCtrl.push('ExhibitorDetailPage', { exhibId: exhibId });
	}
}
