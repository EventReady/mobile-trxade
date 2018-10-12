import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { eventUrl, serverToken, eventId, clientId, database } from "@app/globals";

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ExhibitorDetailService{
	private url: string = `${ eventUrl }.exhibitor`
	private headers: Headers = new Headers({
		'Content-Type': 'application/json',
		'er-id' : serverToken,
		'dsn' : database
	});	
	private options: RequestOptions = new RequestOptions({ headers: this.headers }); 	

	constructor(
		private http: Http
	){

	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - getExhibitors
	** DESC - This will get a list of exhibitors
	**-------------------------------------------------------------------------------------
	*/
	getExhibitor( exhibId: number ){
		return this.http.get( `${ this.url }&clientId=${ clientId }&eventId=${ eventId }&exhibId=${ exhibId }`, this.options )
		.map( this.formatData )
		.catch( this.throwError );
		
	}
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - formatData
	** DESC - This will format the returned data
	**-------------------------------------------------------------------------------------
	*/
	formatData( res: Response ){
		let body = res.json();
		return ( body || {} );
	}	
	/*
	**-------------------------------------------------------------------------------------
	** METHOD NAME - throwError
	** DESC - this will catch all errors generically
	**-------------------------------------------------------------------------------------
	*/
	throwError( error: Response | any ){
		return Observable.throw( error );
	}
}