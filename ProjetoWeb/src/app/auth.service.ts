import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs';
import { environment } from '../environments/environment';
import { JsonLocalStorage, JsonStorage } from './json-storage';

interface UserInfo {
    accessToken: string;
    refreshToken: string;
    refreshAt: number;
    id: string;
    name: string;
    email: string;
    access: string;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	mainUrl = environment.MainUrl
	private userInfo: UserInfo | null = null;
    private readonly userInfoStorage: JsonStorage<UserInfo>;

	constructor(private http: HttpClient) {
        this.userInfoStorage = new JsonLocalStorage('user-info');
        this.userInfo = this.userInfoStorage.load();
    }

	isLoggedIn() {
        return !!this.userInfo;
    }

    logout() {
        this.userInfo = null;
        this.userInfoStorage.delete();
    }

    get getCurrentId() {
        return (this.userInfo && this.userInfo.id) || '';
    }

    get getCurrentName() {
        return (this.userInfo && this.userInfo.name) || '';
    }

    get getCurrentEmail() {
        return (this.userInfo && this.userInfo.email) || '';
    }

    get getCurrentAccess() {
        return (this.userInfo && this.userInfo.access) || '';
    }
    
	getAccessToken() {
        return (this.userInfo && this.userInfo.accessToken) || '';
    }

    // Registrar novo usuário
    postRegister(name: string, email: string, cpf: string, password: string) {
        const url = `${this.mainUrl}/user/register`
        return this.http.post(url, {name, email, cpf, password})
    }

	// Login com email / senha
	postLogin(email: string, password: string) {
		const params = new HttpParams()
			.append('grant_type', 'password')
			.append('scope', 'openid offline_access')
			.append('username', email)
			.append('password', password);

		return this.postConnectToken(params);
	}
	private postConnectToken(params: HttpParams) {
		const options = {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
		return this.http
			.post<any>(`${this.mainUrl}/api/connect/token`, params.toString(), options)
			.pipe(map(response => {
				this.setToken(response);
				return true;
			}));
	}

	private setToken(response: any) {
        // Extraí informações do idToken
        const infoBase64 = response.id_token.split('.')[1];
        const info = JSON.parse(decodeURIComponent(atob(infoBase64)));

        // Atualiza refresh token (se houver)
        let refreshToken = response.refresh_token;
        if (!refreshToken) {
            refreshToken = this.userInfo?.refreshToken;
        }

        // Calcula próxima data de refresh (em milissegundos) - 1/4 da data de expiração
        const now = new Date();
        const refreshAt = new Date(now.getTime() + (response.expires_in / 4) * 1000).getTime();

        // Salva tokens e informações do usuário
        this.userInfo = {
            accessToken: response.access_token,
            refreshAt,
            refreshToken: response.refresh_token,
            id: info.sub,
            name: info.name,
            email: info.email,
            access: info.role
        };
        this.userInfoStorage.save(this.userInfo);
    }

	private postRefreshToken(refreshToken: string) {
        const params = new HttpParams()
            .append('grant_type', 'refresh_token')
            .append('scope', 'openid offline_access')
            .append('refresh_token', refreshToken);

        return this.postConnectToken(params);
    }
}
