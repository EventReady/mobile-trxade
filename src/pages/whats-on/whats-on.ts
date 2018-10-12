import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	LoadingController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { WhatsOnService } from './whats-on.service';
@IonicPage()
@Component({
	selector: 'whats-on',
	templateUrl: 'whats-on.html',
	providers: [AppService, WhatsOnService],
})
export class WhatsOnPage {
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
		public viewCtrl: ViewController,
		public appService: AppService,
		public service: WhatsOnService,
		public loadingCtrl: LoadingController,
	) {
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.service.getCurrentSessions().subscribe((response) => {
			this.loadingPopup.dismiss();
			this.loaded = true;
			this.info = response.list;
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
	goToDetail(scheduleId: number) {
		this.navCtrl.push('ScheduleDetailPage', {
			scheduleId: scheduleId,
			session: 1,
			agenda: 0,
			activity: 0,
		});
	}
}
