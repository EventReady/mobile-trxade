import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	LoadingController,
} from 'ionic-angular';
import { MessagesService } from '../messages.service';
import * as _ from 'lodash';

@IonicPage()
@Component({
	selector: 'contacts',
	templateUrl: 'contacts.html',
	providers: [MessagesService],
})
export class ContactsPage {
	public contacts: Array<any>;
	public filteredList: any[];
	public loaded: boolean = false;
	public loadingPopup;
	public isSearching: boolean = false;

	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - constructor
	**-------------------------------------------------------------------------------------
	*/
	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController,
		public loadingCtrl: LoadingController,
		private msgService: MessagesService,
	) {
		this.loadingPopup = this.loadingCtrl.create({ spinner: 'crescent' });
		this.loadingPopup.present();
		this.msgService.getContacts().subscribe((response) => {
			this.loadingPopup.dismiss();
			this.loaded = true;
			this.contacts = response.data.contacts;
		});
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
	** METHOD NAME - selectContact
	**-------------------------------------------------------------------------------------
	*/
	selectContact(name, id, imgProfile) {
		let dataArray = {
			name: name,
			id: id,
			imgProfile: imgProfile,
		};
		this.viewCtrl.dismiss(dataArray);
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
	** METHOD NAME - cancelSearch
	**-------------------------------------------------------------------------------------
	*/
	cancelSearch(event) {
		this.isSearching = false;
		this.loaded = true;
		console.log('clear search');
		event.stopPropagation();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getItems
	**-------------------------------------------------------------------------------------
	*/
	getItems(event) {
		let term = event.target.value;
		if (_.isUndefined(term)) {
			return;
		}
		let list = [];
		list = this.contacts.filter((item) => {
			const full = `${item.first_name} ${item.last_name}`;
			return full.toLowerCase().indexOf(term.toLowerCase()) > -1;
		});
		this.isSearching = true;
		this.loaded = false;
		this.filteredList = list;
	}
}
