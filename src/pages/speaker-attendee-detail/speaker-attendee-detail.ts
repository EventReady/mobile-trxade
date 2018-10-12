import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	LoadingController,
	AlertController,
	App,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { SpeakerAttendeeDetailService } from './speaker-attendee-detail.service';
@IonicPage()
@Component({
	selector: 'page-speaker-attendee-detail',
	templateUrl: 'speaker-attendee-detail.html',
	providers: [AppService, SpeakerAttendeeDetailService],
})
export class SpeakerAttendeeDetailPage {
	public loadingPopup;
	public loaded: boolean = false;
	public speaker: object;
	public attendees: any[];
	public scheduleId: number;
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
		private app: App,
		private alertCtrl: AlertController,
		private appService: AppService,
		private speakerAttendeeDetailServiceService: SpeakerAttendeeDetailService,
	) {
		this.scheduleId = this.navParams.get('scheduleId');
		if (!this.scheduleId) {
			this.navCtrl.push('SpeakerSessionsPage');
			return;
		}
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.speakerAttendeeDetailServiceService
			.getAttendees(this.scheduleId)
			.subscribe((response) => {
				this.loadingPopup.dismiss();
				this.loaded = true;
				this.attendees = response.list;
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
	** METHOD NAME - sendMessage
	**-------------------------------------------------------------------------------------
	*/
	sendMessage(note) {
		if (!note.value.length) {
			this.presentAlert('Your message cannot be blank!');
			return;
		}
		this.presentAlert('Your message to everyone has been sent!');
		let nav = this.app.getRootNav();
		nav.pop();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - presentAlert
	**-------------------------------------------------------------------------------------
	*/
	presentAlert(title): void {
		let alert = this.alertCtrl.create({
			title: title,
			buttons: ['OK'],
		});
		alert.present();
	}
}
