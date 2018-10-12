import { Component } from '@angular/core';
import { 
	IonicPage, 
	NavController, 
	ViewController, 
	NavParams, 
	LoadingController, 
	AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
	selector: 'tell-friends',
	templateUrl: 'tell-friends.html'
})
export class TellFriendsPage {
	messageForm : FormGroup;
	messages:  any;
	contactName: string = "";
	contactSel: any = false;
	contactId: any;
	contactImgProfile: string;
	title: any;
	body: any;
	  
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
		public alertCtrl: AlertController,
	) {
		this.messageForm = fb.group({
			'to' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
			'title' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])],
			'body' : [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(500)])]
		})  		  
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewWillLoad
	**-------------------------------------------------------------------------------------
	*/
	ionViewWillLoad(): void{
		this.viewCtrl.showBackButton( true ); 		
	}

	submitForm(value: any):void{
		if( !this.contactSel ){
			let alert = this.alertCtrl.create({
				title: 'Error',
				subTitle: 'Contact name is required!',
				buttons: ['OK']
			});
			alert.present();
			return;
		}
	}	
}
