import { Component } from '@angular/core';
import {
	IonicPage,
	NavController,
	ViewController,
	NavParams,
	LoadingController,
} from 'ionic-angular';
import { AppService } from '@app/app.service';
import { MyScheduleService } from './my-schedule.service';
import * as _ from 'lodash';

@IonicPage()
@Component({
	selector: 'my-schedule',
	templateUrl: 'my-schedule.html',
	providers: [AppService, MyScheduleService],
})
export class MySchedulePage {
	public profile;
	public filteredList: any[];
	public loaded: boolean = false;
	public isSearching: boolean = false;
	public data;
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
		private appService: AppService,
		private service: MyScheduleService,
	) {
		this.appService.getRegistrationData().then((data) => {
			this.profile = JSON.parse(data);
			this.service
				.getSchedule(this.profile.reg_id)
				.subscribe((response) => {
					this.data = response;
					this.loaded = true;
				});
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - openSchedule
	**-------------------------------------------------------------------------------------
	*/
	openSchedule(
		event: Event,
		id: number,
		agenda: number,
		session: number,
		activity: number,
	): void {
		this.navCtrl.push('ScheduleDetailPage', {
			scheduleId: id,
			agenda,
			session,
			activity,
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - delete
	**-------------------------------------------------------------------------------------
	*/
	delete(id: number) {
		this.service.delete(id, this.profile.reg_id).subscribe(() => {
			this.service
				.getSchedule(this.profile.reg_id)
				.subscribe((response) => {
					this.data = response;
					this.loaded = true;
				});
		});
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - cancelSearch
	**-------------------------------------------------------------------------------------
	*/
	cancelSearch(event) {
		this.isSearching = false;
		this.loaded = true;
		event.stopPropagation();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - ionViewWillLoad
	**-------------------------------------------------------------------------------------
	*/
	ionViewWillLoad(): void {
		//this.viewCtrl.showBackButton( false );
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
		Object.getOwnPropertyNames(this.data.list).map((key) => {
			let tmp = this.data.list[key];
			if (
				!_.isUndefined(tmp.item) &&
				tmp.item.toLowerCase().indexOf(term.toLowerCase()) > -1
			) {
				list.push(tmp);
			}
		});
		this.isSearching = true;
		this.loaded = false;
		this.filteredList = [].concat.apply([], list);
	}
}
