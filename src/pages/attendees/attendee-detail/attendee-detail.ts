import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	LoadingController,
} from 'ionic-angular';
//import { EmailComposer } from '@ionic-native/email-composer';

import { AppService } from '@app/app.service';
import { AttendeesService } from '../attendees.service';
//import { eventName } from '@app/globals';

@IonicPage()
@Component({
	selector: 'page-attendee-detail',
	templateUrl: 'attendee-detail.html',
	providers: [AppService, AttendeesService],
})
export class AttendeeDetailPage {
	public loadingPopup;
	public loaded: boolean = false;
	public attendee: object;
	public sessions: any[];
	public attendeeId: number;
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
		private attendeeService: AttendeesService,
	) {
		this.attendeeId = this.navParams.get('attendeeId');
		if (!this.attendeeId) {
			this.navCtrl.push('AttendeesPage');
			return;
		}
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.attendeeService
			.getAttendee(this.attendeeId)
			.subscribe((response) => {
				this.loadingPopup.dismiss();
				this.loaded = true;
				this.attendee = response.data.attendee[0];
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
	** METHOD NAME - contact
	**-------------------------------------------------------------------------------------
	*/
	contact(to) {
		/*
		try {
			this.emailComposer
				.isAvailable()
				.then((available: boolean) => {
					if (available) {
						let email = {
							to: to,
							subject: eventName,
							body: 'How are you? Nice greetings from Leipzig',
							isHtml: true,
						};

						// Send a text message using default options
						this.emailComposer.open(email);
					}
				})
				.catch((e) => {
					console.log(e, 'EmailComposer.isAvailable error');
				});
		} catch (e) {}
		*/
	}
}
