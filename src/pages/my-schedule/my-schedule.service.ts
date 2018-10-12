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

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MyScheduleService {
	private schedule_url: string = `${eventUrl}.my-schedule&locationId=${locationId}&eventId=${eventId}`;
	private headers: Headers = new Headers({
		'Content-Type': 'application/json',
		'er-id': serverToken,
		dsn: database,
	});
	private options: RequestOptions = new RequestOptions({
		headers: this.headers,
	});

	constructor(private http: Http) {}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getSchedule
	** DESC - This will get the schedule
	**-------------------------------------------------------------------------------------
	*/
	getSchedule(regId): Observable<any> {
		let body: string = JSON.stringify({
			regId,
		});
		return this.http
			.post(`${this.schedule_url}`, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - delete
	** DESC - This will get the schedule
	**-------------------------------------------------------------------------------------
	*/
	delete(id: number, regId): Observable<any> {
		let body: string = JSON.stringify({
			regId,
			id,
			eventId,
		});
		let url = `${eventUrl}.remove-schedule`;
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
