import { Component, ChangeDetectorRef } from '@angular/core';
import {
	IonicPage,
	NavController,
	ModalController,
	ViewController,
	NavParams,
	LoadingController,
	ToastController,
} from 'ionic-angular';
import { ScheduleDetailService } from './schedule-detail.service';
import { AppService } from '@app/app.service';
import { cl } from '@app/globals';

@IonicPage()
@Component({
	selector: 'schedule-detail',
	templateUrl: 'schedule-detail.html',
	providers: [ScheduleDetailService],
})
export class ScheduleDetailPage {
	public loadingPopup;
	public scheduleId: number;
	public isAgenda: number;
	public isSession: number;
	public isActivity: number;
	public showToolbar: boolean = false;
	public transition: boolean = false;
	public detail: any;
	public loaded: boolean = false;
	public profile;

	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - constructor
	**-------------------------------------------------------------------------------------
	*/
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		public toastCtrl: ToastController,
		public viewCtrl: ViewController,
		public ref: ChangeDetectorRef,
		public modalCtrl: ModalController,
		private detailService: ScheduleDetailService,
		private appService: AppService,
	) {
		this.scheduleId = this.navParams.get('scheduleId');
		this.isAgenda = this.navParams.get('agenda');
		this.isSession = this.navParams.get('session');
		this.isActivity = this.navParams.get('activity');
		if (!this.scheduleId) {
			this.navCtrl.push('SchedulePage');
			return;
		}
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.appService.getRegistrationData().then((data) => {
			this.profile = JSON.parse(data);
		});
		this.detailService
			.getScheduleDetail(
				this.scheduleId,
				this.isAgenda,
				this.isSession,
				this.isActivity,
			)
			.subscribe(
				(response) => {
					this.loadingPopup.dismiss();
					this.detail = response.schedule[0];
					this.loaded = true;
				},
				(err) => cl(err),
			);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewWillLoad
	**-------------------------------------------------------------------------------------
	*/
	ionViewWillLoad(): void {}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewCanEnter
	**-------------------------------------------------------------------------------------
	*/
	ionViewCanEnter(): Promise<any> {
		return this.appService.getLoggedIn();
	}
	onScroll($event: any) {
		let scrollTop = $event.scrollTop;
		this.showToolbar = scrollTop >= 100;
		if (scrollTop < 0) {
			this.transition = false;
		} else {
			this.transition = true;
		}
		this.ref.detectChanges();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - addNote
	** DESC - This will add a note
	**-------------------------------------------------------------------------------------
	*/
	addNote() {
		let modal = this.modalCtrl.create('NotesModalPage', {
			noteType: 'Schedule',
		});
		modal.present();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - mySchedule
	**-------------------------------------------------------------------------------------
	*/
	mySchedule() {
		this.navCtrl.push('MySchedulePage');
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - addToSchedule
	**-------------------------------------------------------------------------------------
	*/
	addToSchedule(scheduleId: number) {
		this.detailService
			.addtoSchedule(scheduleId, this.profile.reg_id)
			.subscribe(() =>
				this.presentToast(
					'bottom',
					'Session has been added to your session',
					1000,
				),
			);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToSpeaker
	**-------------------------------------------------------------------------------------
	*/
	goToSpeaker(speakerId) {
		this.navCtrl.push('SpeakerDetailPage', { speakerId });
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
