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
export class DocumentService {
	private url: string = `${eventUrl}.files`;
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
	** METHOD NAME - getFiles
	**-------------------------------------------------------------------------------------
	*/
	getFiles(regid) {
		let body: string = JSON.stringify({
			regid,
			eventId,
			clientId,
		});

		return this.http
			.post(`${this.url}`, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - setFavFile
	**-------------------------------------------------------------------------------------
	*/
	setFavFile(regid, fileId, set) {
		let body: string = JSON.stringify({
			fileId,
			regid,
			eventId,
			clientId,
			set,
			exhibId: fileId,
		});
		return this.http
			.post(`${eventUrl}.fav-file`, btoa(body), this.options)
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
