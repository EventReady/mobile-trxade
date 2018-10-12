import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	AlertController,
	LoadingController,
	ModalController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { SurveysService } from './surveys.service';
import * as moment from 'moment';
import { surveyMessage } from '@app/globals';
@IonicPage()
@Component({
	selector: 'surveys',
	templateUrl: 'surveys.html',
	providers: [SurveysService],
})
export class SurveysPage {
	public loaded: boolean = false;
	public reg_id: number = 0;
	public surveys1: any[];
	public surveys2: any[];
	public loadingPopup;
	public surveyMessage: string = surveyMessage;
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
		public AlertCtrl: AlertController,
		public modalCtrl: ModalController,
		private appService: AppService,
		private surveysService: SurveysService,
	) {
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();

		this.appService.getRegistrationData().then((data) => {
			this.reg_id = JSON.parse(data).reg_id;
		});

		let todaysDate = moment();
		let startDate = moment('2018-08-29');
		let endDate = moment('2018-11-15');
		if (todaysDate.isAfter(startDate) && todaysDate.isBefore(endDate)) {
			this.surveysService
				.getSurveys('2018-08-29', '2018-11-13')
				.subscribe((response) => {
					this.loadingPopup.dismiss();
					this.loaded = true;
					this.surveys1 = response.data.surveys;
				});
		}
		startDate = moment('2018-11-13');
		endDate = moment('2018-12-15');
		if (todaysDate.isAfter(startDate) && todaysDate.isBefore(endDate)) {
			this.surveysService
				.getSurveys('2018-11-14', '2018-12-14')
				.subscribe((response) => {
					this.surveys2 = response.data.surveys;
				});
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
	** METHOD NAME - ionViewWillLoad
	**-------------------------------------------------------------------------------------
	*/
	ionViewWillLoad(): void {
		this.viewCtrl.showBackButton(true);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToDetail
	**-------------------------------------------------------------------------------------
	*/
	goToDetail(surveyId: number, question: string) {
		this.navCtrl.push('SurveyDetailPage', {
			surveyId,
			question,
			regId: this.reg_id,
		});
	}
}
