import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {
	eventUrl,
	serverToken,
	eventId,
	clientId,
	database,
} from '@app/globals';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MyDocumentsService {
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
	** METHOD NAME - getMyFiles
	** DESC - This will get a list of exhibitors
	**-------------------------------------------------------------------------------------
	*/
	getMyFiles(regid) {
		let body: string = JSON.stringify({
			clientId,
			eventId,
			regid,
		});
		return this.http
			.post(`${eventUrl}.my-files`, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - sendFiles
	**-------------------------------------------------------------------------------------
	*/
	sendFiles(regId): Observable<any> {
		let body: string = JSON.stringify({
			eventId,
			regId,
		});
		let url = `${eventUrl}.send-files`;
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
