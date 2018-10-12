import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { eventUrl, serverToken, eventId, database } from '@app/globals';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HelpService {
	private url: string = `${eventUrl}.notes`;
	private headers: Headers = new Headers({
		'Content-Type': 'application/json',
		'er-id': serverToken,
		dsn: database,
	});
	private options: RequestOptions = new RequestOptions({
		headers: this.headers,
	});

	constructor(private http: Http) {}

	getScheduleDetail(scheduleId: number): Observable<any> {
		return this.http
			.get(`${this.url}&scheduleId=${scheduleId}`, this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - saveNote
	**-------------------------------------------------------------------------------------
	*/
	saveNote(regId, note: string, noteId: number) {
		let url = `${eventUrl}.save-note&eventId=${eventId}&note=${note}&noteId=${noteId}&item=${btoa(
			regId,
		)}`;
		return this.http
			.get(url, this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - addtoSchedule
	**-------------------------------------------------------------------------------------
	*/
	addNote(regId, note: string, noteType: string) {
		let url = `${eventUrl}.add-notes&eventId=${eventId}&note=${note}&noteType=${noteType}&item=${btoa(
			regId,
		)}`;
		return this.http
			.get(url, this.options)
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
