import { Observable, throwError } from 'rxjs';
import { catchError, delay, retryWhen } from 'rxjs/operators';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root'
})
export class AuthHttpService {
	constructor(private auth: AuthService,
		private http: HttpClient,
		private router: Router) { }

	appendHeader(options: any, name: string, value: string) {
		options = this.initOptions(options);
		options.headers = options.headers.append(name, value);
		return options as { headers: HttpHeaders };
	}

	private appendCommonHeaders(options?: any) {
		return this.appendHeader(options, 'Authorization', 'Bearer ' + this.auth.getAccessToken());
	}

	private initOptions(options?: any) {
		if (!options) {
			options = {};
		}
		if (!options.headers) {
			options.headers = new HttpHeaders();
		}
		return options as { headers: HttpHeaders };
	}

	get<T>(url: string, options?: any): Observable<T> {
		return this.http.get<T>(url, this.appendCommonHeaders(options)).pipe(catchError(err => this.handleError(err)));
	}

	retryGet<T>(url: string, options?: any): Observable<T> {
		return this.get<T>(url, options).pipe(retryWhen(errors => errors.pipe(delay(1000)))).pipe(catchError(err => this.handleError(err)));
	}

	post<T>(url: string, body: any, options?: any): Observable<T> {
		return this.http.post<T>(url, body, this.appendCommonHeaders(options)).pipe(catchError(err => this.handleError(err)));
	}

	put<T>(url: string, body: any, options?: any): Observable<T> {
		return this.http.put<T>(url, body, this.appendCommonHeaders(options)).pipe(catchError(err => this.handleError(err)));
	}

	delete<T>(url: string, options?: any): Observable<T> {
		return this.http.delete<T>(url, this.appendCommonHeaders(options)).pipe(catchError(err => this.handleError(err)));
	}

	private handleError(error: any) {
		if (error instanceof HttpErrorResponse) {
			if (error.status === 401) {
				const wasLoggedIn = this.auth.isLoggedIn();
				this.auth.logout();
				if (wasLoggedIn) {
					alert('Sua sessão expirou.');
				}
				this.router.navigate(['/login']);
			}
		}
		return throwError(error);
	}
}
