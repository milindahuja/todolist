/**
 * Created By : Milind Ahuja 
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {

	constructor(private http: HttpClient) { }

	doLogin(data){
		return this.http.post('https://engine-staging.viame.ae/assessment/login', data);
	}

	doRegister(data){
		console.log(data);
		return this.http.post('https://engine-staging.viame.ae/assessment/users', data);	
	}
}

/**
 * Created By : Milind Ahuja 
 */