import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	LoadingController,
	AlertController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { SpeakerService } from '../speakers.service';
import { speakerDownloadURl } from '@app/globals';
@IonicPage()
@Component({
	selector: 'speaker-detail',
	templateUrl: 'speaker-detail.html',
	providers: [AppService, SpeakerService],
})
export class SpeakerDetailPage {
	public loadingPopup;
	public loaded: boolean = false;
	public speaker: object;
	public sessions: any[];
	public speakerId: number;
	public speakerDownloadURl: string = speakerDownloadURl;
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
		private alertCtrl: AlertController,
		private appService: AppService,
		private speakerService: SpeakerService,
	) {
		this.speakerId = this.navParams.get('speakerId');
		if (!this.speakerId) {
			this.navCtrl.push('SpeakersPage');
			return;
		}
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.speakerService.getSpeaker(this.speakerId).subscribe((response) => {
			this.loadingPopup.dismiss();
			this.loaded = true;
			this.speaker = response.data.speaker;
			this.sessions = response.data.sessions;
			console.log(response.data.sessions);
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
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - follow
	** DESC - follow the speaker
	**-------------------------------------------------------------------------------------
	*/
	follow() {
		let alert = this.alertCtrl.create({
			title: 'You are now following this speaker',
			buttons: ['OK'],
		});
		alert.present();
	}
}
