import { Component } from '@angular/core';
import {
	IonicPage,
	ViewController,
	ModalController,
	AlertController,
	NavController,
	App,
} from 'ionic-angular';
import { MyNotesService } from './my-notes.service';
import { AppService } from '@app/app.service';

@IonicPage()
@Component({
	selector: 'my-notes',
	templateUrl: 'my-notes.html',
	providers: [MyNotesService, AppService],
})
export class MyNotesPage {
	public profile;
	public loaded: boolean = false;
	public data;
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - constructor
	**-------------------------------------------------------------------------------------
	*/
	constructor(
		public viewCtrl: ViewController,
		private appService: AppService,
		public alertCtrl: AlertController,
		public modalCtrl: ModalController,
		private service: MyNotesService,
		private navCtrl: NavController,
		private app: App,
	) {
		this.initialize();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - initialize
	**-------------------------------------------------------------------------------------
	*/
	initialize() {
		this.appService.getRegistrationData().then((data) => {
			this.profile = JSON.parse(data);
			this.service.getNotes(this.profile.reg_id).subscribe((response) => {
				this.data = response;
				this.loaded = true;
			});
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewCanEnter
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
	** METHOD NAME - editNote
	** DESC - This will add a note
	**-------------------------------------------------------------------------------------
	*/
	editNote(id, note, noteType) {
		let modal = this.modalCtrl.create('NotesModalPage', {
			noteType: noteType,
			id: id,
			note: note,
		});
		modal.present();
		modal.dismiss(() => {});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - deleteNote
	**-------------------------------------------------------------------------------------
	*/
	deleteNote(id) {
		this.presentAlert('Are you sure you want to delete this note?', id);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - back
	**-------------------------------------------------------------------------------------
	*/
	back() {
		let nav = this.app.getRootNav();
		nav.push('DashboardPage');
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - sendNotes
	**-------------------------------------------------------------------------------------
	*/
	sendNotes() {
		this.service.sendNotes(this.profile.reg_id).subscribe((response) => {});
		this.presentSuccess('Your notes have been emailed to you');
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	presentAlert(title, id): void {
		let alert = this.alertCtrl.create({
			title: title,
			buttons: [
				{
					text: 'Cancel',
					handler: () => {},
				},
				{
					text: 'Yes, Delete it',
					handler: () => {
						this.service
							.deleteNote(id, this.profile.reg_id)
							.subscribe(() => {
								this.navCtrl.setRoot(
									this.navCtrl.getActive().component,
								);
							});
						//;
					},
				},
			],
		});
		alert.present();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - 
	** DESC - 
	**-------------------------------------------------------------------------------------
	*/
	presentSuccess(title): void {
		let alert = this.alertCtrl.create({
			title: title,
			buttons: [
				{
					text: 'Ok',
					handler: () => {},
				},
			],
		});
		alert.present();
	}
}
