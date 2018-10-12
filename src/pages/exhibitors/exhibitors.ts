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
import { ExhibitorService } from './exhibitors.service';
import * as _ from 'lodash';

@IonicPage()
@Component({
	selector: 'exhibitors',
	templateUrl: 'exhibitors.html',
	providers: [AppService, ExhibitorService],
})
export class ExhibitorsPage {
	public loaded: boolean = false;
	public exhibitors: any[];
	public filteredList: any[];
	public isSearching: boolean = false;
	public profile: any;
	public loadingPopup;
	private visible = [];
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
				.getExhibitors(this.profile.reg_id)
				.subscribe((response) => {
					this.loadingPopup.dismiss();
					this.loaded = true;
					this.exhibitors = response.data.exhibitors;
					this.exhibitors.forEach((item) => {
						if (item.favorite > 0) {
							this.visible.push(item.favorite);
						}
					});
					console.log(this.visible);
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
		list = this.exhibitors.filter((item) => {
			const full = `${item.exhibitor}`;
			return full.toLowerCase().indexOf(term.toLowerCase()) > -1;
		});
		this.isSearching = true;
		this.loaded = false;
		this.filteredList = list;
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - markAsFavorite
	**-------------------------------------------------------------------------------------
	*/
	markAsFavorite(exhibId: number) {
		const index = this.visible.indexOf(exhibId);
		if (index > -1) {
			this.visible.splice(index, 1);
			const ret = this.exhibitorService.setFavExhibitors(
				this.profile.reg_id,
				exhibId,
				'no',
			);
			ret.subscribe((x) =>
				this.presentToast(
					'bottom',
					'Exhibitor unmarked as favorite',
					1000,
				),
			);
		} else {
			this.visible.push(exhibId);
			const ret = this.exhibitorService.setFavExhibitors(
				this.profile.reg_id,
				exhibId,
				'yes',
			);
			ret.subscribe((x) =>
				this.presentToast(
					'bottom',
					'Exhibitor marked as favorite',
					1000,
				),
			);
		}

		//delete message
	}
	/*
**-------------------------------------------------------------------------------------
** METHOD NAME - createMessage
** DESC - 
**-------------------------------------------------------------------------------------
*/
	presentToast(position: string, message: string, duration: number) {
		let toast = this.toastCtrl.create({
			message: message,
			position: position,
			duration: duration,
		});
		toast.present();
	}
}
