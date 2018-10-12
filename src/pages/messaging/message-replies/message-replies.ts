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
import { defaultProfilePic } from '@app/globals';
import { MessagesService } from '@pages/messaging/messages.service';
import { lists } from './replies-data';
@IonicPage()
@Component({
	selector: 'message-replies',
	templateUrl: 'message-replies.html',
	providers: [AppService, MessagesService],
})
export class MessageRepliesPage {
	public hideHeader: boolean = false;
	public lists: any[] = lists;
	public defaultProfilePic: string = defaultProfilePic;
	public profile: any;
	public message: any;
	public replies: any;
	public loaded: boolean = false;
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
		private appService: AppService,
		private service: MessagesService,
	) {
		if (this.navParams.data.hideHeader) {
			this.hideHeader = this.navParams.data.hideHeader;
		}
		this.messageId = this.navParams.get('messageId');
		if (!this.messageId) {
			this.navCtrl.push('MessagesPage');
			return;
		}
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
	** METHOD NAME - ionViewWillEnter
	**-------------------------------------------------------------------------------------
	*/
	ionViewWillEnter() {
		this.appService.getRegistrationData().then((data) => {
			this.profile = JSON.parse(data);
			this.service
				.getMessage(this.profile.reg_id, this.messageId)
				.subscribe((ret) => {
					this.message = ret.message[0];
					this.replies = ret.replies;
					this.loaded = true;
				});
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
	** METHOD NAME - createMessage
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	sendResponse() {
		this.navCtrl.push('ResponseFormPage', {
			hideHeader: this.hideHeader,
			messageId: this.messageId,
		});
	}
}
