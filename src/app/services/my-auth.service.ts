import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService, AuthServiceConfig, LoginOpt, SocialUser } from 'angularx-social-login';
import { UserRole } from '../auth/UserRole';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyAuthService extends AuthService {

    private apiURL = `${environment.apiURL}`;
    public userRole: UserRole;

    public currentRole: Observable<UserRole>;
    private currentRoleSubject: BehaviorSubject<UserRole>;

    constructor(private authConfig: AuthServiceConfig, private http: HttpClient) {
        super(authConfig);
        const role = localStorage.getItem('userRole');
        if (role) {
            this.userRole = parseInt(role, 10);
            this.currentRoleSubject = new BehaviorSubject<UserRole>(this.userRole);
        } else {
            this.currentRoleSubject = new BehaviorSubject<UserRole>(null);
        }
        this.currentRole = this.currentRoleSubject.asObservable();
    }

    signIn(providerId: string, opt?: LoginOpt): Promise<SocialUser> {
        return super.signIn(providerId, opt).then( (user: SocialUser) => {
            this.http.post(`${this.apiURL}/users/login`, user).pipe(map((res: any) => {
                this.userRole = res.role;
                localStorage.setItem('authToken', res.authToken);
                localStorage.setItem('userRole', res.role);
                this.currentRoleSubject.next(res.role);
            }));
            return user;
        });
    }

    login(providerId: string, opt?: LoginOpt) {
        return super.signIn(providerId, opt).then( (user: SocialUser) => {
            return this.http.post(`${this.apiURL}/users/login`, user).pipe(map((res: any) => {
                localStorage.setItem('authToken', res.authToken);
                localStorage.setItem('userRole', res.role);
                this.userRole = res.role;
                this.currentRoleSubject.next(res.role);
            })).toPromise();
        });
    }

    signOut(revoke?: boolean) {
        return super.signOut(revoke).then(res => {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            this.userRole = null;
            this.currentRoleSubject.next(null);
            return res;
        });
    }

    isAdmin() {
        return this.userRole && this.userRole === UserRole.ADMIN_USER;
    }

    isRegularUser() {
        return this.userRole && this.userRole === UserRole.REGULAR_USER;
    }

    isLoggedIn() {
        return this.userRole;
    }

    updateRole(userRole: UserRole) {
        this.userRole = userRole;
        localStorage.setItem('userRole', userRole.toString());
        this.updateUserRole();
    }

    updateUserRole() {
        this.http.post(`${this.apiURL}/users/update_token`, null).subscribe((res: any) => {
            this.userRole = res.role;
            localStorage.setItem('authToken', res.authToken);
            localStorage.setItem('userRole', res.role);
            this.currentRoleSubject.next(res.role);
        });
    }
}
