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
	selector: 'response-form',
	templateUrl: 'response-form.html',
	providers: [MessagesService, AppService],
})
export class ResponseFormPage {
	messageForm: FormGroup;
	messages: any;
	body: any;
	public profile: any;
	public hideHeader: boolean = false;
	public messageId: number;

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
		if (this.navParams.data.hideHeader) {
			this.hideHeader = this.navParams.data.hideHeader;
		}
		this.messageId = this.navParams.get('messageId');
		if (!this.messageId) {
			this.navCtrl.push('MessageRepliesPage');
			return;
		}
		this.appService.getRegistrationData().then((data) => {
			this.profile = JSON.parse(data);
		});

		this.messageForm = fb.group({
			body: [
				null,
				Validators.compose([
					Validators.required,
					Validators.maxLength(500),
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
	submitForm(value: any): void {
		this.service
			.saveResponse(value.body, this.profile.reg_id, this.messageId)
			.subscribe((ret) => {
				this.presentToast('bottom', 'Message Sent!', 3000);
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
