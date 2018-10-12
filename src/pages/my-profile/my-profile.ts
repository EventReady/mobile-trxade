import { Component } from '@angular/core';
import {
	IonicPage,
	MenuController,
	NavController,
	AlertController,
	ViewController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
@IonicPage()
@Component({
	selector: 'my-profile',
	templateUrl: 'my-profile.html',
	providers: [AppService],
})
export class MyProfilePage {
	public profile: object;
	public loaded: boolean = false;
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - constructor
	**-------------------------------------------------------------------------------------
	*/
	constructor(
		public navCtrl: NavController,
		public alertCtrl: AlertController,
		public viewCtrl: ViewController,
		public menuCtrl: MenuController,
		private appService: AppService,
	) {
		this.appService.getRegistrationData().then((data) => {
			this.profile = JSON.parse(data);
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
	** METHOD NAME - logout
	**-------------------------------------------------------------------------------------
	*/
	logout(): void {
		this.appService.clearSession().then(() => {
			this.menuCtrl.close();
			this.navCtrl.push('LoginPage');
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
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
