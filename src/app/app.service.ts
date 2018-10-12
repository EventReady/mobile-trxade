import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class AppService {
	constructor(private storage: Storage) {}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - clearSession
	** DESC - This will clear the user session
	**-------------------------------------------------------------------------------------
	*/
	clearSession(): Promise<any> {
		this.storage.remove('registration');
		this.storage.remove('appToken');
		this.storage.set('isLoggedIn', false);
		return this.storage.ready();
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - setLoggedIn
	** DESC - this will set the logged in flag
	**-------------------------------------------------------------------------------------
	*/
	setLoggedIn(login: boolean): void {
		this.storage.set('isLoggedIn', login);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - setIsSpeaker
	** DESC - this will set the logged in flag
	**-------------------------------------------------------------------------------------
	*/
	setIsSpeaker(isSpeaker: boolean): void {
		this.storage.set('isSpeaker', isSpeaker);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - setLoggedIn
	** DESC - this will get the logged in flag
	**-------------------------------------------------------------------------------------
	*/
	getLoggedIn(): Promise<any> {
		return this.storage.get('isLoggedIn');
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - setIsSpeaker
	** DESC - this will get the logged in flag
	**-------------------------------------------------------------------------------------
	*/
	getIsSpeaker(): Promise<any> {
		return this.storage.get('isSpeaker');
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - setRegistrationData
	** DESC - this will set the registration data
	**-------------------------------------------------------------------------------------
	*/
	setRegistrationData(registration: object): void {
		this.storage.set('registration', JSON.stringify(registration));
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - setSpeakerData
	** DESC - this will set the registration data
	**-------------------------------------------------------------------------------------
	*/
	setSpeakerData(speaker: object): void {
		this.storage.set('speaker', JSON.stringify(speaker));
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getRegistrationData
	** DESC - this will get the registration data
	returns a promise
	**-------------------------------------------------------------------------------------
	*/
	getRegistrationData(): Promise<any> {
		return this.storage.get('registration');
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getRegistrationData
	** DESC - this will get the registration data
	returns a promise
	**-------------------------------------------------------------------------------------
	*/
	getSpeakerData(): Promise<any> {
		return this.storage.get('speaker');
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - setRegistrationData
	** DESC - this will set the registration data
	**-------------------------------------------------------------------------------------
	*/
	setAppToken(token: string): void {
		this.storage.set('appToken', token);
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getRegistrationData
	** DESC - this will get the registration data
	**-------------------------------------------------------------------------------------
	*/
	getAppToken() {
		return this.storage.get('appToken');
	}
}
