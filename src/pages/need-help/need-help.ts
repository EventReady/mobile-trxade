import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	LoadingController,
	ToastController,
	AlertController,
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '@pages/messaging/messages.service';
import { AppService } from '@app/app.service';

@IonicPage()
@Component({
	selector: 'page-need-help',
	templateUrl: 'need-help.html',
	providers: [MessagesService, AppService],
})
export class NeedHelpPage {
	messageForm: FormGroup;
	messages: any;
	body: any;
	public profile: any;

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
		public fb: FormBuilder,
		public toastCtrl: ToastController,
		public alertCtrl: AlertController,
		private service: MessagesService,
		private appService: AppService,
	) {
		this.appService.getRegistrationData().then((data) => {
			this.profile = JSON.parse(data);
		});

		this.messageForm = fb.group({
			body: [
				null,
				Validators.compose([
					Validators.required,
					Validators.maxLength(2500),
				]),
			],
		});
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
	submitForm(value: any): void {
		this.service
			.sendHelpMessage(value.body, this.profile.reg_id)
			.subscribe((ret) => {
				this.presentToast('bottom', 'Help Message Sent!', 3000);
				try {
					this.navCtrl.pop();
				} catch (e) {
					console.log(e);
				}
			});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - presentToast
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
