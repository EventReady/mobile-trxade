import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	ViewController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';

@IonicPage()
@Component({
	selector: 'info-booth-detail',
	templateUrl: 'info-booth-detail.html',
})
export class InfoBoothDetailPage {
	public title: string;
	public description: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		private appService: AppService,
	) {
		this.title = this.navParams.get('title');
		this.description = this.navParams.get('description');
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
}
