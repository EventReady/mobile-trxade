import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	LoadingController,
	ModalController,
	AlertController,
	App,
} from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

import { AppService } from '@app/app.service';
import { SurveysService } from '../surveys.service';

@IonicPage()
@Component({
	selector: 'survey-detail',
	templateUrl: 'survey-detail.html',
	providers: [AppService, SurveysService],
})
export class SurveyDetailPage {
	public loadingPopup;
	public loaded: boolean = false;
	public surveyId: number;
	public question: string;
	public answer: any;
	public regId: number;
	public surveyForm: any;
	public answerField: string = null;
	public answerId: number;

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
		public modalCtrl: ModalController,
		public alertCtrl: AlertController,
		private app: App,
		private fb: FormBuilder,
		private appService: AppService,
		private surveysService: SurveysService,
	) {
		this.surveyId = this.navParams.get('surveyId');
		this.question = this.navParams.get('question');
		this.regId = this.navParams.get('regId');
		if (!this.surveyId) {
			this.navCtrl.push('SurveysPage');
			return;
		}
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();

		this.surveysService
			.getSurveyAnswer(this.surveyId, this.regId)
			.subscribe((response) => {
				this.loadingPopup.dismiss();
				this.answer = response.data.surveyAnswer.length
					? response.data.surveyAnswer[0]
					: { survey_answer: '', id: 0 };
				this.surveyForm = this.fb.group({
					question: [
						this.answer.survey_answer,
						Validators.compose([Validators.required]),
					],
				});
				this.loaded = true;
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
	** METHOD NAME - saveSurvey
	**-------------------------------------------------------------------------------------
	*/
	saveSurvey() {
		if (!this.surveyForm.valid) {
			this.presentAlert('Answer can not be blank');
			return;
		}

		if (this.answer.id > 0) {
			this.surveysService
				.saveAnswer(
					this.regId,
					this.surveyId,
					this.surveyForm.get('question').value,
				)
				.subscribe(() => {
					this.presentAlert('Survey answer saved!');
					let nav = this.app.getRootNav();
					nav.pop();
				});

			return;
		}
		this.surveysService
			.addAnswer(
				this.regId,
				this.surveyId,
				this.surveyForm.get('question').value,
			)
			.subscribe(() => {
				this.presentAlert('Survey answer saved!');
				let nav = this.app.getRootNav();
				nav.pop();
			});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - close
	**-------------------------------------------------------------------------------------
	*/
	close() {
		this.viewCtrl.dismiss([]);
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
