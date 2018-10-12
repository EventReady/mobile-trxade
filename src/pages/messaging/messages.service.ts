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
export class MessagesService {
	private headers: Headers = new Headers({
		'Content-Type': 'application/json',
		'er-id': serverToken,
		dsn: database,
	});
	private options: RequestOptions = new RequestOptions({
		headers: this.headers,
	});
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - constructor
	**-------------------------------------------------------------------------------------
	*/
	constructor(private http: Http) {}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getContacts
	**-------------------------------------------------------------------------------------
	*/
	deleteMessage(messageId) {
		let body: string = JSON.stringify({
			clientId,
			eventId,
			messageId,
		});

		return this.http
			.post(`${eventUrl}.delete-message`, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getContacts
	**-------------------------------------------------------------------------------------
	*/
	getContacts() {
		return this.http
			.get(
				`${eventUrl}.contacts&clientId=${clientId}&eventId=${eventId}`,
				this.options,
			)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getMessages
	**-------------------------------------------------------------------------------------
	*/
	getMessages(regid) {
		let body: string = JSON.stringify({
			clientId,
			eventId,
			regid,
		});
		return this.http
			.post(`${eventUrl}.get-messages`, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getMessage
	**-------------------------------------------------------------------------------------
	*/
	getMessage(regid, messageId) {
		let body: string = JSON.stringify({
			clientId,
			eventId,
			regid,
			messageId,
		});
		return this.http
			.post(`${eventUrl}.get-message`, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - saveMessage
	**-------------------------------------------------------------------------------------
	*/
	saveMessage(subject, message, regid, contactid) {
		let body: string = JSON.stringify({
			subject,
			contactid,
			message,
			clientId,
			regid,
			eventId,
		});
		return this.http
			.post(`${eventUrl}.save-message`, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - saveResponse
	**-------------------------------------------------------------------------------------
	*/
	saveResponse(message, regid, messageId) {
		let body: string = JSON.stringify({
			message,
			messageId,
			clientId,
			eventId,
			regid,
		});
		return this.http
			.post(`${eventUrl}.save-response`, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - sendHelpMessage
	**-------------------------------------------------------------------------------------
	*/
	sendHelpMessage(message, regid) {
		let body: string = JSON.stringify({
			message,
			clientId,
			eventId,
			regid,
		});
		return this.http
			.post(`${eventUrl}.send-help-message`, btoa(body), this.options)
			.map(this.formatData)
			.catch(this.throwError);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - sendShareMessage
	**-------------------------------------------------------------------------------------
	*/
	sendShareMessage(email, message, regid) {
		let body: string = JSON.stringify({
			email,
			message,
			clientId,
			eventId,
			regid,
		});
		return this.http
			.post(`${eventUrl}.send-share-message`, btoa(body), this.options)
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
