import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	LoadingController,
	ToastController,
	ModalController,
	AlertController,
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from '../messages.service';
import { AppService } from '@app/app.service';
import { defaultProfilePic } from '@app/globals';
@IonicPage()
@Component({
	selector: 'messaging-form',
	templateUrl: 'messaging-form.html',
	providers: [MessagesService, AppService],
})
export class MessagingFormPage {
	messageForm: FormGroup;
	messages: any;
	contactName: string = '';
	contactSel: any = false;
	contactId: any;
	contactImgProfile: string = defaultProfilePic;

	title: any;
	body: any;
	public profile: any;
	public hideHeader: boolean = false;

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
		private modalCtrl: ModalController,
		private service: MessagesService,
		private appService: AppService,
	) {
		if (this.navParams.data.hideHeader) {
			this.hideHeader = this.navParams.data.hideHeader;
		}
		this.appService.getRegistrationData().then((data) => {
			this.profile = JSON.parse(data);
		});

		this.messageForm = fb.group({
			title: [
				null,
				Validators.compose([
					Validators.required,
					Validators.maxLength(100),
				]),
			],
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
		if (!this.contactSel) {
			let alert = this.alertCtrl.create({
				title: 'Error',
				subTitle: 'Contact name is required!',
				buttons: ['OK'],
			});
			alert.present();
			return;
		}
		this.service
			.saveMessage(
				value.title,
				value.body,
				this.profile.reg_id,
				this.contactId,
			)
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
	** METHOD NAME - selectContact
	**-------------------------------------------------------------------------------------
	*/
	selectContact() {
		let modal = this.modalCtrl.create('ContactsPage');
		modal.onDidDismiss((dataArray) => {
			if (dataArray) {
				this.contactSel = true;
				this.contactName = dataArray.name;
				this.contactId = dataArray.id;
			}
		});
		modal.present();
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
