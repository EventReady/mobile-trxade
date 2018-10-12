import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';

//***********  ionic-native **************/
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppService } from '@app/app.service';
import {
	eventName,
	eventDesc,
	oneSignalKey,
	googleAnalyticsKey,
	facebook,
	twitter,
	youtube,
} from '@app/globals';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { DashboardService } from '@pages/dashboard/dashboard-service';
@Component({
	templateUrl: 'app.html',
	providers: [AppService, InAppBrowser, DashboardService],
})
export class AppComponent {
	@ViewChild(Nav)
	nav: Nav;
	public rootPage: string;
	public menu: Array<any> = [];
	public pages: Array<any>;
	public eventLocation: string;
	public eventName: string;
	public eventDescription: string;
	public profile: object;
	public loaded: boolean = false;
	public isSpeaker: boolean = false;
	public facebook: string = facebook;
	public twitter: string = twitter;
	public youtube: string = youtube;
	public menuesLoaded: boolean = false;
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	constructor(
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		public menuCtrl: MenuController,
		public events: Events,
		private appService: AppService,
		private iab: InAppBrowser,
		private ga: GoogleAnalytics,
		private dashboardService: DashboardService,
	) {
		this.appService.getIsSpeaker().then((isSpeaker) => {
			this.isSpeaker = isSpeaker;
		});

		this.appService.getRegistrationData().then((data) => {
			this.profile = JSON.parse(data);
			this.loaded = true;
		});

		this.initializeApp();
		this.menu = [];
		this.setAttendeeMenu();
		events.subscribe('usertype:attendee', (data) => {
			this.setAttendeeMenu();
		});
		events.subscribe('usertype:speaker', (data) => {
			this.setSpeakerMenu();
		});

		this.eventName = eventName;
		this.eventDescription = eventDesc;
		this.appService.getLoggedIn().then((isLoggedIn) => {
			this.appService.setLoggedIn(isLoggedIn || false);
			if (isLoggedIn) {
				this.nav.setRoot('DashboardPage');
			} else {
				this.nav.setRoot('LoginPage');
			}
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - initializeApp
	**-------------------------------------------------------------------------------------
	*/
	initializeApp() {
		this.platform.ready().then(() => {
			if (this.platform.is('cordova')) {
				this.statusBar.styleDefault();
				this.splashScreen.hide();
			}
			this.splashScreen.hide();
			if (this.platform.is('cordova')) {
				this.startGoogleAnalytics();
				this.startOneSignal();
			}
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - startGoogleAnalytics
	**-------------------------------------------------------------------------------------
	*/
	startGoogleAnalytics() {
		this.ga
			.startTrackerWithId(googleAnalyticsKey)
			.then(() => {
				console.log('Google analytics is ready now');
				this.ga.trackView('test');
			})
			.catch((e) => console.log('Error starting GoogleAnalytics', e));
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - startOneSignal
	**-------------------------------------------------------------------------------------
	*/
	startOneSignal() {
		var iosSettings = {};
		iosSettings['kOSSettingsKeyAutoPrompt'] = true; // will not prompt users when start app 1st time
		iosSettings['kOSSettingsKeyInAppLaunchURL'] = false; // false opens safari with Launch URL
		// OneSignal Code start:
		// Enable to debug issues.
		/*
		window['plugins'].OneSignal.setLogLevel({
			logLevel: 4,
			visualLevel: 4,
		});
		*/
		var notificationOpenedCallback = function(jsonData) {
			console.log(
				'notificationOpenedCallback: ' + JSON.stringify(jsonData),
			);
			if (jsonData.notification.payload.additionalData != null) {
				console.log('Here we access addtional data');
				if (
					jsonData.notification.payload.additionalData.openURL != null
				) {
					console.log(
						'Here we access the openURL sent in the notification data',
					);
				}
			}
		};
		window['plugins'].OneSignal.startInit(oneSignalKey)
			.iOSSettings(iosSettings) // only needed if added Optional OneSignal code for iOS above
			.inFocusDisplaying(
				window['plugins'].OneSignal.OSInFocusDisplayOption.Notification,
			)
			.handleNotificationOpened(notificationOpenedCallback)
			.endInit();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
	**-------------------------------------------------------------------------------------
	*/
	toggleDetails(menu) {
		if (menu.showDetails) {
			menu.showDetails = false;
			menu.icon = 'ios-add-outline';
			return;
		}
		menu.showDetails = true;
		menu.icon = 'ios-remove-outline';
		return;
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
	**-------------------------------------------------------------------------------------
	*/
	openPage(page) {
		if (page.component === 'YoutubePage') {
			this.goToYouTube();
			return;
		}
		if (page.component === 'TwitterPage') {
			this.goToTwitter();
			return;
		}
		if (page.component === 'FacebookPage') {
			this.goToFacebook();
			return;
		}
		this.nav.push(page.component).catch((err) => console.error(err));
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - logout
	**-------------------------------------------------------------------------------------
	*/
	logout(): void {
		this.appService.clearSession().then(() => {
			this.menuCtrl.close();
			this.nav.remove(0, 100);
			this.nav.push('LoginPage');
		});
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
	** METHOD NAME - setSpeakerMenu
	**-------------------------------------------------------------------------------------
	*/
	setSpeakerMenu() {
		this.dashboardService.getDashboardConfig().subscribe((response) => {
			this.pages = response.data.speakerSidebar;
			this.menuesLoaded = true;
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - setAttendeeMenu
	**-------------------------------------------------------------------------------------
	*/
	setAttendeeMenu() {
		this.dashboardService.getDashboardConfig().subscribe((response) => {
			this.pages = response.data.attendeeSidebar;
			this.menuesLoaded = true;
		});
	}
}
