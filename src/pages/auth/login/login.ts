import { Component, ViewChild } from '@angular/core';
import {
	IonicPage,
	MenuController,
	NavController,
	LoadingController,
	AlertController,
	Content,
} from 'ionic-angular';
import { Events } from 'ionic-angular';

import { FormBuilder, Validators } from '@angular/forms';
import { cl, hasSpeakerLogin, aboutConference } from '@app/globals';
import { AuthService } from '../auth.service';
import { AppService } from '@app/app.service';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
	providers: [AuthService, AppService],
})
export class LoginPage {
	public loginForm: any;
	public loginSpeakerForm: any;
	public backgroundImage: any = '';
	public loaded: boolean = false;
	public showSpeakerLogin: boolean = false;
	public showAttendeeLogin: boolean = true;
	public hasSpeakerLogin: boolean = hasSpeakerLogin;
	public aboutConference: string = aboutConference;
	@ViewChild(Content)
	content: Content;

	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	constructor(
		public navCtrl: NavController,
		public fb: FormBuilder,
		public alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		public events: Events,
		public menuCtrl: MenuController,
		private authService: AuthService,
		private appService: AppService,
	) {
		this.loginForm = fb.group({
			email: [null, Validators.compose([Validators.required])],
			password: [
				null,
				Validators.compose([
					Validators.minLength(4),
					Validators.required,
				]),
			],
		});

		this.loginSpeakerForm = fb.group({
			email: [null, Validators.compose([Validators.required])],
			password: [
				null,
				Validators.compose([
					Validators.minLength(4),
					Validators.required,
				]),
			],
		});

		this.menuCtrl.enable(false);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewWillEnter
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	ionViewWillEnter() {
		this.appService.getLoggedIn().then((data) => {
			if (data) {
				this.navCtrl.setRoot('DashboardPage');
			} else {
				this.loaded = true;
			}
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	login(): void {
		if (!this.loginForm.valid) {
			this.presentAlert('Reg ID & password can not be blank');
			return;
		}
		let loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		loadingPopup.present();
		this.authService
			.processLogin(
				this.loginForm.get('email').value,
				this.loginForm.get('password').value,
			)
			.subscribe(
				(response) => {
					if (!response.success) {
						loadingPopup.dismiss();
						this.presentAlert('Login failed, please try again');
						return;
					}
					this.authService.startSession(response);
					loadingPopup.dismiss();
					this.menuCtrl.enable(true);
					this.events.publish('usertype:attendee', true);
					this.navCtrl.setRoot('DashboardPage');
				},
				(err) => cl(err),
			);
		return;
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - loginSpeaker
	**-------------------------------------------------------------------------------------
	*/
	loginSpeaker() {
		if (!this.loginSpeakerForm.valid) {
			this.presentAlert('Username & password can not be blank');
			return;
		}
		let loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		loadingPopup.present();
		this.authService
			.processSpeakerLogin(
				this.loginSpeakerForm.get('email').value,
				this.loginSpeakerForm.get('password').value,
			)
			.subscribe(
				(response) => {
					if (!response.success) {
						loadingPopup.dismiss();
						this.presentAlert('Login failed, please try again');
						return;
					}
					this.authService.startSpeakerSession(response);
					loadingPopup.dismiss();
					this.menuCtrl.enable(true);
					this.events.publish('usertype:speaker', true);
					this.navCtrl.setRoot('DashboardPage');
				},
				(err) => cl(err),
			);
		return;
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - forgot
	**-------------------------------------------------------------------------------------
	*/
	forgot(): void {
		this.navCtrl.push('ForgotPage', {
			showSpeaker: false,
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - forgotSpeaker
	**-------------------------------------------------------------------------------------
	*/
	forgotSpeaker() {
		this.navCtrl.push('ForgotPage', {
			showSpeaker: true,
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - createAccount
	**-------------------------------------------------------------------------------------
	*/
	createAccount(): void {
		this.navCtrl.push('RegisterPage');
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
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - scrollToBottom
	**-------------------------------------------------------------------------------------
	*/
	scrollToBottom() {
		setTimeout(() => {
			this.content.scrollToBottom();
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - speakerLogin
	**-------------------------------------------------------------------------------------
	*/
	speakerLogin() {
		let loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		loadingPopup.present();
		setTimeout(() => {
			loadingPopup.dismiss();
		}, 500);
		this.showSpeakerLogin = true;
		this.showAttendeeLogin = false;
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - AttendeeLogin
	**-------------------------------------------------------------------------------------
	*/
	AttendeeLogin() {
		let loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		loadingPopup.present();
		setTimeout(() => {
			loadingPopup.dismiss();
		}, 500);
		this.showSpeakerLogin = false;
		this.showAttendeeLogin = true;
	}
}
