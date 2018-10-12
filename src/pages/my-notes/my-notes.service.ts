import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { eventUrl, serverToken, eventId, database } from '@app/globals';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MyNotesService {
	private schedule_url: string = `${eventUrl}.my-notes&eventId=${eventId}`;
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
	** METHOD NAME - getNotes
	** DESC - This will get the notes
	**-------------------------------------------------------------------------------------
	*/
	getNotes(regId): Observable<any> {
		let body: string = JSON.stringify({
			regId,
		});
		this.schedule_url = `${this.schedule_url}`;
		return this.http
			.post(this.schedule_url, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getNotes
	** DESC - This will get the notes
	**-------------------------------------------------------------------------------------
	*/
	sendNotes(regId): Observable<any> {
		let body: string = JSON.stringify({
			eventId,
			regId,
		});
		let url = `${eventUrl}.send-notes`;
		return this.http
			.post(url, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getNotes
	** DESC - This will get the notes
	**-------------------------------------------------------------------------------------
	*/
	deleteNote(noteId, regId): Observable<any> {
		let body: string = JSON.stringify({
			eventId,
			noteId,
			regId,
		});
		let url = `${eventUrl}.delete-note`;
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
