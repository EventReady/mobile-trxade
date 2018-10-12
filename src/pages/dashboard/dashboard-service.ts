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
export class DashboardService {
	private url: string = `${eventUrl}`;
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
	** METHOD NAME - getCallout
	**-------------------------------------------------------------------------------------
	*/
	getCallout() {
		return this.http
			.get(
				`${this.url}.dashboard&clientId=${clientId}&eventId=${eventId}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - globalSearch
	**-------------------------------------------------------------------------------------
	*/
	globalSearch(term) {
		return this.http
			.get(
				`${
					this.url
				}.global-search&clientId=${clientId}&eventId=${eventId}&term=${term}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - globalSearch
	**-------------------------------------------------------------------------------------
	*/
	getDashboardConfig() {
		return this.http
			.get(`${this.url}.dashboard-data`, this.options)
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
