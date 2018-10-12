import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { eventUrl, serverToken, eventId, clientId, database } from '@app/globals';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AttendeesService {
	private url: string = `${eventUrl}.attendees`;
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
	** METHOD NAME - getAttendee
	**-------------------------------------------------------------------------------------
	*/
	getAttendee(attendeeId: number) {
		return this.http
			.get(
				`${
					this.url
				}.attendee&clientId=${clientId}&eventId=${eventId}&attendeeId=${attendeeId}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getExhibitors
	** DESC - This will get a list of exhibitors
	**-------------------------------------------------------------------------------------
	*/
	getAttendees(start: number = 0, end: number = 0, term: string = '') {
		return this.http
			.get(
				`${
					this.url
				}&clientId=${clientId}&eventId=${eventId}&start=${start}&end=${end}&term=${term}`,
				this.options,
			)
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
