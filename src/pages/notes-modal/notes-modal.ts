import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	NavParams,
	AlertController,
	ViewController,
	App,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { FormBuilder, Validators } from '@angular/forms';
import { NotesService } from './notes.service';
//import { cl } from "@app/globals";

@IonicPage()
@Component({
	selector: 'notes-modal',
	templateUrl: 'notes-modal.html',
	providers: [AppService, NotesService],
})
export class NotesModalPage {
	public notesForm: any;
	public noteType: string;
	public profile: any;
	public note: string = null;
	public noteId: number = 0;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		private appService: AppService,
		private fb: FormBuilder,
		public alertCtrl: AlertController,
		private service: NotesService,
		private app: App,
	) {
		this.note = this.navParams.get('note');
		this.noteId = this.navParams.get('id');
		this.appService.getRegistrationData().then((data) => {
			this.profile = JSON.parse(data);
		});
		this.notesForm = this.fb.group({
			note: [this.note, Validators.compose([Validators.required])],
		});
		this.noteType = this.navParams.get('noteType');
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
	** METHOD NAME - saveNote
	** DESC - This will save the note
	**-------------------------------------------------------------------------------------
	*/
	saveNote() {
		if (!this.notesForm.valid) {
			this.presentAlert('Note can not be blank');
			return;
		}
		if (this.noteId) {
			this.service
				.saveNote(
					this.profile.reg_id,
					this.notesForm.get('note').value,
					this.noteId,
				)
				.subscribe(() => {
					this.viewCtrl.dismiss([]);
					let nav = this.app.getRootNav();
					nav.push('MyNotesPage');
				});

			return;
		}
		this.service
			.addNote(
				this.profile.reg_id,
				this.notesForm.get('note').value,
				this.noteType,
			)
			.subscribe(() => {
				this.viewCtrl.dismiss([]);
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
	** METHOD NAME - 
	** DESC - 
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
