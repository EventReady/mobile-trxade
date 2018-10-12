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
export class SurveysService {
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
	** METHOD NAME - getSurveys
	**-------------------------------------------------------------------------------------
	*/
	getSurveys(startDate: string, endDate: string) {
		return this.http
			.get(
				`${eventUrl}.surveys&clientId=${clientId}&eventId=${eventId}&startDate=${startDate}&endDate=${endDate}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getSurveyAnswer
	**-------------------------------------------------------------------------------------
	*/
	getSurveyAnswer(surveyId: number, regId) {
		let body: string = JSON.stringify({
			clientId,
			eventId,
			surveyId,
			regId,
		});
		return this.http
			.post(`${eventUrl}.survey-answer`, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - saveAnswer
	**-------------------------------------------------------------------------------------
	*/
	saveAnswer(regId, surveyId, answer) {
		let body: string = JSON.stringify({
			clientId,
			eventId,
			answer,
			surveyId,
			regId,
		});
		return this.http
			.post(`${eventUrl}.save-answer`, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - addAnswer
	**-------------------------------------------------------------------------------------
	*/
	addAnswer(regId, surveyId, answer) {
		let body: string = JSON.stringify({
			clientId,
			eventId,
			answer,
			surveyId,
			regId,
		});
		return this.http
			.post(`${eventUrl}.add-answer`, btoa(body), this.options)
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
