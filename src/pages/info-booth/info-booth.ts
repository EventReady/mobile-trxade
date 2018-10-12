import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	LoadingController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { InfoBoothService } from './info-booth.service';

@IonicPage()
@Component({
	selector: 'info-booth',
	templateUrl: 'info-booth.html',
	providers: [AppService, InfoBoothService],
})
export class InfoBoothPage {
	public info: any[];
	public loaded: boolean;
	public loadingPopup;

	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - constructor
	**-------------------------------------------------------------------------------------
	*/
	constructor(
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public viewCtrl: ViewController,
		private appService: AppService,
		private service: InfoBoothService,
	) {
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.service.getInfo().subscribe((response) => {
			this.loadingPopup.dismiss();
			this.loaded = true;
			this.info = response.list;
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - backToDashboard
	**-------------------------------------------------------------------------------------
	*/
	backToDashboard() {
		this.navCtrl.push('DashboardPage');
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
		this.viewCtrl.showBackButton(false);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToDetail
	** DESC - this will take the user to the detail page
	**-------------------------------------------------------------------------------------
	*/
	goToDetail(title: string, description: string) {
		this.navCtrl.push('InfoBoothDetailPage', {
			title: title,
			description: description,
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - formatHTML
	**-------------------------------------------------------------------------------------
	*/
	formatHTML(html) {
		return html.replace(/<\/?[^>]+(>|$)/g, '');
	}
}
