import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	LoadingController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { SpeakerService } from './speaker-sessions.service';
@IonicPage()
@Component({
	selector: 'page-speaker-sessions',
	templateUrl: 'speaker-sessions.html',
	providers: [AppService, SpeakerService],
})
export class SpeakerSessionsPage {
	public loadingPopup;
	public loaded: boolean = false;
	public speaker: object;
	public sessions: any[];
	public speakerId: number;
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
		private appService: AppService,
		private speakerService: SpeakerService,
	) {
		this.appService.getSpeakerData().then((ret) => {
			this.speakerId = JSON.parse(ret).speaker_id;
			this.loadingPopup = this.loadingCtrl.create({
				spinner: 'crescent',
			});
			this.loadingPopup.present();
			this.speakerService
				.getSpeaker(this.speakerId)
				.subscribe((response) => {
					this.loadingPopup.dismiss();
					this.loaded = true;
					this.speaker = response.data.speaker;
					this.sessions = response.data.sessions;
					console.log(response.data.sessions);
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
	**-------------------------------------------------------------------------------------
	*/
	goToDetail(scheduleId: number) {
		this.navCtrl.push('SpeakerAttendeeDetailPage', {
			scheduleId: scheduleId,
		});
	}
}
