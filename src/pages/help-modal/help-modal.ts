import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	Platform,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { appId } from '@app/globals';
import { Market } from '@ionic-native/market';

@IonicPage()
@Component({
	selector: 'hek=lp-modal',
	templateUrl: 'help-modal.html',
	providers: [AppService, Market],
})
export class HelpModalPage {
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - constructor
	**-------------------------------------------------------------------------------------
	*/
	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController,
		private appService: AppService,
		private plt: Platform,
		private market: Market,
	) {}
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
		this.viewCtrl.showBackButton(true);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - closeModal
	**-------------------------------------------------------------------------------------
	*/
	closeModal() {
		this.navCtrl.pop();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - goToPage
 	**-------------------------------------------------------------------------------------
	*/
	appInfo() {
		this.navCtrl.push('InfoBoothPage');
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - shareApp
	**-------------------------------------------------------------------------------------
	*/
	shareApp() {
		this.navCtrl.push('ShareAppPage');
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - checkUpdates
	**-------------------------------------------------------------------------------------
	*/
	checkUpdates() {
		if (
			this.plt.is('cordova') ||
			this.plt.is('ios') ||
			this.plt.is('android')
		) {
			this.market.open(appId);
		} else {
			alert(`Your phone does not have the ability to open the app store`);
		}
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - sendHelpEmail
	**-------------------------------------------------------------------------------------
	*/
	sendHelpEmail() {
		this.navCtrl.push('NeedHelpPage');
	}
}
