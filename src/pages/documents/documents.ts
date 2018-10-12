import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	ToastController,
	NavParams,
	LoadingController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { DocumentService } from './document.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
@IonicPage()
@Component({
	selector: 'documents',
	templateUrl: 'documents.html',
	providers: [DocumentService],
})
export class DocumentsPage {
	public loaded: boolean = false;
	public files: any;
	public loadingPopup;
	private visible = [];
	public profile: any;

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
		private service: DocumentService,
		private iab: InAppBrowser,
	) {
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.appService.getRegistrationData().then((data) => {
			this.profile = JSON.parse(data);
			this.service.getFiles(this.profile.reg_id).subscribe((response) => {
				this.loadingPopup.dismiss();
				this.loaded = true;
				this.files = response.data.files;
				this.files.forEach((item) => {
					if (item.favorite > 0) {
						this.visible.push(item.favorite);
					}
				});
			});
		});
	}
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
	** METHOD NAME - markAsFavorite
	**-------------------------------------------------------------------------------------
	*/
	markAsFavorite(fileId: number) {
		const index = this.visible.indexOf(fileId);
		if (index > -1) {
			this.visible.splice(index, 1);
			const ret = this.service.setFavFile(
				this.profile.reg_id,
				fileId,
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
			this.visible.push(fileId);
			const ret = this.service.setFavFile(
				this.profile.reg_id,
				fileId,
				'yes',
			);
			ret.subscribe((x) =>
				this.presentToast('bottom', 'File marked as favorite', 2000),
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
