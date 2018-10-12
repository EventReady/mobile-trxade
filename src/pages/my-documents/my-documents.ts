import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	ToastController,
	LoadingController,
	AlertController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { MyDocumentsService } from './my-documents.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@IonicPage()
@Component({
	selector: 'my-documents',
	templateUrl: 'my-documents.html',
	providers: [AppService, MyDocumentsService],
})
export class MyDocumentsPage {
	public loaded: boolean = false;
	public files: any[];
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
		public alertCtrl: AlertController,
		private appService: AppService,
		private fileService: MyDocumentsService,
		private iab: InAppBrowser,
	) {
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.appService.getRegistrationData().then((data) => {
			this.profile = JSON.parse(data);
			this.fileService
				.getMyFiles(this.profile.reg_id)
				.subscribe((response) => {
					this.loadingPopup.dismiss();
					this.loaded = true;
					this.files = response.data.files;
				});
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToDetail
	**-------------------------------------------------------------------------------------
	*/
	goToDetail(path: string): void {
		this.iab.create(path, '_system', { location: 'no' });
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
	** METHOD NAME - downloadUrl
	**-------------------------------------------------------------------------------------
	*/
	downloadUrl() {
		this.fileService
			.sendFiles(this.profile.reg_id)
			.subscribe((response) => {});
		this.presentSuccess('Your notes have been emailed to you');
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	presentSuccess(title): void {
		let alert = this.alertCtrl.create({
			title: title,
			buttons: [
				{
					text: 'Ok',
					handler: () => {},
				},
			],
		});
		alert.present();
	}
}
