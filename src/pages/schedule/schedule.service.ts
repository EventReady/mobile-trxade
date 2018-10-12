import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {
	eventUrl,
	serverToken,
	eventId,
	locationId,
	database,
} from '@app/globals';
import * as _ from 'lodash';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ScheduleService {
	private schedule_url: string = `${eventUrl}.schedule&locationId=${locationId}&eventId=${eventId}`;
	private headers: Headers = new Headers({
		'Content-Type': 'application/json',
		'er-id': serverToken,
		dsn: database,
	});
	private options: RequestOptions = new RequestOptions({
		headers: this.headers,
	});

	constructor(private http: Http) {}
	translateList(list: Array<any>): Array<any> {
		return list;
	}
	translateDays(days: Array<any>): Array<any> {
		return _.map(days, (day) => day.start_date);
	}
	getSchedule(
		day: number,
		start: number = 0,
		end: number = 100,
		term: string = '',
	): Observable<any> {
		return this.http
			.get(
				`${
					this.schedule_url
				}&day=${day}&start=${start}&end=${end}&term=${term}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	getSchedules(): Observable<any> {
		return this.http
			.get(this.schedule_url, this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - formatData
	** DESC - This will format the returned data
	**-------------------------------------------------------------------------------------
	*/
	formatData(res: Response) {
		let body = res.json();
		return body || {};
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - throwError
	** DESC - this will catch all errors generically
	**-------------------------------------------------------------------------------------
	*/
	throwError(error: Response | any) {
		return Observable.throw(error);
	}
}
