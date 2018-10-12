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
import { ExhibitorDetailService } from './exhibitor-detail.service';

@IonicPage()
@Component({
	selector: 'exhibitor-detail',
	templateUrl: 'exhibitor-detail.html',
	providers: [AppService, ExhibitorDetailService],
})
export class ExhibitorDetailPage {
	public loadingPopup;
	public loaded: boolean = false;
	public exhibitor: object;
	public exhibId: number;
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
		private exhibitorService: ExhibitorDetailService,
	) {
		this.exhibId = this.navParams.get('exhibId');
		if (!this.exhibId) {
			this.navCtrl.push('ExhibitorsPage');
			return;
		}
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.exhibitorService
			.getExhibitor(this.exhibId)
			.subscribe((response) => {
				this.loadingPopup.dismiss();
				this.loaded = true;
				this.exhibitor = response.data.exhibitor[0];
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
		this.navCtrl.push('ExhibitorDetail', { exhibId: exhibId });
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - addNote
	** DESC - This will add a note
	**-------------------------------------------------------------------------------------
	*/
	addNote() {
		let modal = this.modalCtrl.create('NotesModalPage', {
			noteType: 'Exhibitor',
		});
		modal.present();
	}
}
