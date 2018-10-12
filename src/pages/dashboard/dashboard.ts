import { Component, ViewChild, ElementRef } from '@angular/core';
import {
	IonicPage,
	MenuController,
	NavController,
	ViewController,
	NavParams,
	LoadingController,
	Nav,
	Platform,
	App,
	ModalController,
} from 'ionic-angular';
import { Observable } from 'rxjs/Rx';

import { AppService } from '@app/app.service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import {
	eventName,
	eventDesc,
	downloadUrl,
	facebook,
	twitter,
	youtube,
	dashboardBannerHeight,
	dashboardBannerSpeed,
} from '@app/globals';
import { DashboardService } from './dashboard-service';
import { ImageViewerController } from 'ionic-img-viewer';
@IonicPage()
@Component({
	selector: 'dashboard',
	templateUrl: 'dashboard.html',
	providers: [InAppBrowser, ImageViewerController],
})
export class DashboardPage {
	@ViewChild(Nav)
	nav: Nav;
	@ViewChild('appSearchHeader')
	appSearchHeader: ElementRef;
	@ViewChild('appSearch')
	appSearch: ElementRef;

	public categories: Array<object>;
	public colors: Array<string>;
	public eventName: string = eventName;
	public eventDesc: string = eventDesc;
	public callout$: Observable<any>;
	public loaded = false;
	public callout;
	public spotlight;
	public downloadUrl = downloadUrl;
	public isSpeaker: boolean = false;
	public facebook: string = facebook;
	public twitter: string = twitter;
	public youtube: string = youtube;
	public dashboardBannerHeight: string = dashboardBannerHeight;
	public dashboardBannerSpeed: number = dashboardBannerSpeed;
	public attendeeMenu = {};
	public speakerMenu = {};
	public banners = [];
	public venueMaps = [];
	public menuesLoaded: boolean = false;
	public loadingPopup;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loadingCtrl: LoadingController,
		public viewCtrl: ViewController,
		public menuCtrl: MenuController,
		public modalCtrl: ModalController,
		public plt: Platform,
		public app: App,
		private appService: AppService,
		private iab: InAppBrowser,
		private service: DashboardService,
		private _imageViewerCtrl: ImageViewerController,
	) {
		this.appService.getIsSpeaker().then((isSpeaker) => {
			this.isSpeaker = isSpeaker;
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewWillEnter
	**-------------------------------------------------------------------------------------
	*/
	ionViewWillEnter() {
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();

		this.service.getCallout().subscribe((response) => {
			this.loaded = true;
			this.callout = response.callout;
			this.spotlight = response.spotlight;
		});
		this.service.getDashboardConfig().subscribe((response) => {
			this.attendeeMenu = response.data.attendeeMenu;
			this.speakerMenu = response.data.speakerMenu;
			this.banners = response.data.banners;
			this.venueMaps = response.data.venueMaps;
			this.menuesLoaded = true;
			this.loadingPopup.dismiss();
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewCanEnter
	**-------------------------------------------------------------------------------------
	*/
	ionViewCanEnter(): Promise<boolean> {
		return this.appService.getLoggedIn();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewWillLoad
	**-------------------------------------------------------------------------------------
	*/
	ionViewWillLoad(): void {
		this.viewCtrl.showBackButton(false);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - gotToPage
	** DESC - This will navigate to the page
	**-------------------------------------------------------------------------------------
	*/
	public goToPage(event: Event, component: string): void {
		this.menuCtrl.close();
		if (component === 'YoutubePage') {
			this.goToYouTube();
			return;
		}
		if (component === 'TwitterPage') {
			this.goToTwitter();
			return;
		}
		if (component === 'FacebookPage') {
			this.goToFacebook();
			return;
		}
		this.navCtrl.push(component);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - gotToPage
	**-------------------------------------------------------------------------------------
	*/
	public openMenu(): void {
		this.menuCtrl.open();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToFacebook
	**-------------------------------------------------------------------------------------
	*/
	goToFacebook() {
		this.iab.create(facebook, '_self', {
			location: 'no',
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToTwitter
	**-------------------------------------------------------------------------------------
	*/
	goToTwitter() {
		this.iab.create(twitter, '_self', {
			location: 'no',
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToYouTube
	**-------------------------------------------------------------------------------------
	*/
	goToYouTube() {
		this.iab.create(youtube, '_self', {
			location: 'no',
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToActivityFeed
	**-------------------------------------------------------------------------------------
	*/
	goToActivityFeed(event: Event, component: string) {
		if (this.plt.is('cordova')) {
			if (this.plt.is('ios')) {
				this.iab.create(twitter, '_blank', {
					location: 'no',
				});
				return;
			}
			if (this.plt.is('android')) {
				this.goToPage(event, component);
				return;
			}
		}
		this.goToPage(event, component);
		return;
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToMap
	**-------------------------------------------------------------------------------------
	*/
	goToMap(myImage) {
		const imageViewer = this._imageViewerCtrl.create(myImage);
		imageViewer.present();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - logout
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	logout(): void {
		this.appService.clearSession().then(() => {
			this.menuCtrl.close();
			const nav = this.app.getRootNav();
			nav.remove(0, 100);
			nav.setRoot('LoginPage');
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - openHelp
	**-------------------------------------------------------------------------------------
	*/
	openHelp() {
		this.navCtrl.push('HelpModalPage');
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - openAlerts
	**-------------------------------------------------------------------------------------
	*/
	openAlerts() {
		let modal = this.modalCtrl.create('AlertsModalPage');
		modal.present();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - searchApp
	**-------------------------------------------------------------------------------------
	*/
	searchApp() {
		let modal = this.modalCtrl.create('EventSearchPage');
		modal.present();
	}
}
