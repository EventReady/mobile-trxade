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
import { FormBuilder } from '@angular/forms';
import { AppService } from '@app/app.service';
import { MessagesService } from '../messages.service';

@IonicPage()
@Component({
	selector: 'messages',
	templateUrl: 'messages.html',
	providers: [AppService, MessagesService],
})
export class MessagesPage {
	public messages: any;
	public loaded: boolean = false;
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
		private appService: AppService,
		private service: MessagesService,
	) {
		if (this.navParams.data.hideHeader) {
			this.hideHeader = this.navParams.data.hideHeader;
		}
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewWillEnter
	**-------------------------------------------------------------------------------------
	*/
	ionViewWillEnter() {
		this.appService.getRegistrationData().then((data) => {
			this.profile = JSON.parse(data);
			this.service.getMessages(this.profile.reg_id).subscribe((ret) => {
				this.messages = ret.messages;
				this.loaded = true;
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
	** METHOD NAME - createMessage
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	createMessage() {
		this.navCtrl.push('MessagingFormPage', {
			hideHeader: this.hideHeader,
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToMessage
	**-------------------------------------------------------------------------------------
	*/
	goToMessage(id: number) {
		this.navCtrl.push('MessageRepliesPage', {
			hideHeader: this.hideHeader,
			messageId: id,
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - createMessage
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	deleteMessage(key: string) {
		this.presentToast('bottom', 'Removed', 1000);
		this.service.deleteMessage(key).subscribe((ret) => {
			this.appService.getRegistrationData().then((data) => {
				this.profile = JSON.parse(data);
				this.service
					.getMessages(this.profile.reg_id)
					.subscribe((ret) => {
						this.messages = ret.messages;
						this.loaded = true;
					});
			});
		});
		//delete message
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
