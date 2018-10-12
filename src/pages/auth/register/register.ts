import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html'
})
export class RegisterPage {
	public registerForm;
	public backgroundImage: any = "./assets/bg2.jpg";
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	constructor(
		public nav: NavController, 
		public fb: FormBuilder, 
		public loadingCtrl: LoadingController, 
		public alertCtrl: AlertController,
		public viewCtrl: ViewController
	){

		this.registerForm = fb.group({
			email: [ "", Validators.compose([ Validators.required, Validators.pattern( EMAIL_REGEXP )] )],
			profileName: [ "", Validators.compose([ Validators.minLength( 2 ), Validators.required ]) ],
			phone: [ "", Validators.compose([ Validators.minLength( 6 ), Validators.required ])],
			password: [ "", Validators.compose([ Validators.minLength( 6 ), Validators.required ])],
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	ionViewDidLoad() {
		this.viewCtrl.showBackButton( false ); 
   	} 
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	registerUser(): void {
		if ( !this.registerForm.valid ){
			this.presentAlert("invalid form");
			return;
		}	
		let loadingPopup = this.loadingCtrl.create({
			spinner: 'crescent', 
			content: 'Creating..'
		});
		loadingPopup.present();
		return;
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	presentAlert( title ): void {
		let alert = this.alertCtrl.create({
			title: title,
			buttons: ['OK']
		});
		alert.present();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - back
	** DESC - go back
	**-------------------------------------------------------------------------------------
	*/
	back(): void{
		this.nav.push( "LoginPage" );
	}	
}
