import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppService } from '@app/app.service';

@IonicPage()
@Component({
	selector: 'page-alerts-modal',
	templateUrl: 'alerts-modal.html',
})
export class AlertsModalPage {
	public tab1Root: string = 'MessagesPage';
	public tab2Root: string = 'FeedTabPage';
	public tab3Root: string = 'NewsTabPage';
	public tabParams;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public appService: AppService,
	) {
		this.tabParams = {
			hideHeader: true,
		};
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
	ionViewWillLoad(): void {}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - closeModal
	**-------------------------------------------------------------------------------------
	*/
	closeModal() {
		this.navCtrl.pop();
	}
}
