import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {
	eventUrl,
	serverToken,
	locationId,
	eventId,
	database,
} from '@app/globals';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ScheduleDetailService {
	private url: string = `${eventUrl}.schedule-detail`;
	private headers: Headers = new Headers({
		'Content-Type': 'application/json',
		'er-id': serverToken,
		dsn: database,
	});
	private options: RequestOptions = new RequestOptions({
		headers: this.headers,
	});

	constructor(private http: Http) {}

	getScheduleDetail(
		scheduleId: number,
		isAgenda: number,
		isSession: number,
		isActivity: number,
	): Observable<any> {
		return this.http
			.get(
				`${
					this.url
				}&scheduleId=${scheduleId}&isAgenda=${isAgenda}&isSession=${isSession}&isActivity=${isActivity}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - addtoSchedule
	**-------------------------------------------------------------------------------------
	*/
	addtoSchedule(scheduleId: number, regId) {
		let body: string = JSON.stringify({
			regId,
			locationId,
			scheduleId,
			eventId,
		});
		let url = `${eventUrl}.add-schedule`;
		return this.http
			.post(url, btoa(body), this.options)
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
