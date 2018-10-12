import {
	IonicPage,
	NavController,
	ViewController,
	LoadingController,
	AlertController,
	NavParams,
} from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { cl } from '@app/globals';
import { AuthService } from '../auth.service';

@IonicPage()
@Component({
	selector: 'page-forgot',
	templateUrl: 'forgot.html',
	providers: [AuthService],
})
export class ForgotPage {
	public resetPasswordForm;
	public resetSpeakerPasswordForm;
	public backgroundImage: any = '';
	public showSpeaker: boolean = false;
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	constructor(
		public fb: FormBuilder,
		public nav: NavController,
		public loadingCtrl: LoadingController,
		public alertCtrl: AlertController,
		public viewCtrl: ViewController,
		private authService: AuthService,
		public navParams: NavParams,
	) {
		this.showSpeaker = this.navParams.get('showSpeaker');
		this.resetPasswordForm = fb.group({
			regid: ['', Validators.compose([Validators.required])],
		});
		this.resetSpeakerPasswordForm = fb.group({
			username: ['', Validators.compose([Validators.required])],
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	ionViewDidLoad() {
		this.viewCtrl.showBackButton(false);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - resetSpeakerPassword
	**-------------------------------------------------------------------------------------
	*/
	resetSpeakerPassword() {
		if (!this.resetSpeakerPasswordForm.valid) {
			this.presentAlert('Please provide a valid usernmae');
			return;
		}

		let loadingPopup = this.loadingCtrl.create({
			spinner: 'crescent',
			content: '',
		});
		loadingPopup.present();
		this.authService
			.retrievePassword(
				this.resetSpeakerPasswordForm.get('username').value,
				this.showSpeaker,
			)
			.subscribe(
				(response) => {
					loadingPopup.dismiss();
					this.presentAlert(
						'If your record is found, you will get an email with further instructions.',
					);
				},
				(err) => cl(err),
			);
		return;
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - resetpassword
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	resetPassword() {
		if (!this.resetPasswordForm.valid) {
			this.presentAlert('Please provide a valid registration id');
			return;
		}

		let loadingPopup = this.loadingCtrl.create({
			spinner: 'crescent',
			content: '',
		});
		loadingPopup.present();
		this.authService
			.retrievePassword(
				this.resetPasswordForm.get('regid').value,
				this.showSpeaker,
			)
			.subscribe(
				(response) => {
					loadingPopup.dismiss();
					this.presentAlert(
						'If your record is found, you will get an email with further instructions.',
					);
				},
				(err) => cl(err),
			);
		return;
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - presentAlert
	**-------------------------------------------------------------------------------------
	*/
	presentAlert(title) {
		let alert = this.alertCtrl.create({
			title: title,
			buttons: ['OK'],
		});
		alert.present();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - back
	**-------------------------------------------------------------------------------------
	*/
	back(): void {
		this.nav.push('LoginPage');
	}
}
