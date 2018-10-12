import { Component } from '@angular/core';
import {
	ViewController,
	LoadingController,
	IonicPage,
	NavController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { InfoBoothService } from '@pages/info-booth/info-booth.service';
@IonicPage()
@Component({
	selector: 'page-news-tab',
	templateUrl: 'news-tab.html',
	providers: [AppService, InfoBoothService],
})
export class NewsTabPage {
	public info: any[];
	public loaded: boolean = false;
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
	** METHOD NAME - ionViewCanEnter
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
	ionViewWillLoad(): void {}
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
