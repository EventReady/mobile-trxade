import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import {
	eventUrl,
	serverToken,
	clientId,
	eventId,
	database,
} from '@app/globals';
import { AppService } from '@app/app.service';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthService {
	private url: string = `${eventUrl}.auth`;
	private headers: Headers = new Headers({
		'Content-Type': 'application/json',
		'er-id': serverToken,
		dsn: database,
	});
	private options: RequestOptions = new RequestOptions({
		headers: this.headers,
	});

	constructor(private http: Http, private appService: AppService) {}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - retrievePassword
	** DESC - This will retrive the users password 
	**-------------------------------------------------------------------------------------
	*/
	retrievePassword(regid: string, isSpeaker: boolean): Observable<any> {
		if (isSpeaker) {
			return this.retrieveSpeakerPassword(regid);
		}
		let body: string = JSON.stringify({
			regid: regid,
			clientId: clientId,
			eventId: eventId,
		});
		return this.http
			.post(`${eventUrl}.forget-password`, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - retrieveSpeakerPassword
	**-------------------------------------------------------------------------------------
	*/
	retrieveSpeakerPassword(username: string): Observable<any> {
		let body: string = JSON.stringify({
			username: username,
			clientId: clientId,
			eventId: eventId,
		});
		return this.http
			.post(
				`${eventUrl}.forget-speaker-password`,
				btoa(body),
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - startSession
	**-------------------------------------------------------------------------------------
	*/
	startSession(response): void {
		this.appService.setAppToken(response.data.token);
		this.appService.setRegistrationData(response.data.registration[0]);
		this.appService.setIsSpeaker(false);
		this.appService.setLoggedIn(true);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - startSpeakerSession
	**-------------------------------------------------------------------------------------
	*/
	startSpeakerSession(response): void {
		this.appService.setAppToken(response.data.token);
		this.appService.setSpeakerData(response.data.speaker[0]);
		this.appService.setIsSpeaker(true);
		this.appService.setLoggedIn(true);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - processLogin
	**-------------------------------------------------------------------------------------
	*/
	processLogin(username: string, password: string): Observable<any> {
		let body: string = JSON.stringify({
			username: username,
			password: password,
			clientId: clientId,
			eventId: eventId,
		});
		this.options.headers['foo'] = body;
		return this.http
			.post(this.url, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - processSpeakerLogin
	**-------------------------------------------------------------------------------------
	*/
	processSpeakerLogin(username: string, password: string): Observable<any> {
		let body: string = JSON.stringify({
			username: username,
			password: password,
			clientId: clientId,
			eventId: eventId,
		});
		return this.http
			.post(`${eventUrl}.process-speaker-login`, btoa(body), this.options)
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
