import { Component, OnInit } from '@angular/core';

import { SwPush } from '@angular/service-worker';
import { GoogleLoginProvider } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { ApiService } from 'src/app/services/api.service';
import { MyAuthService } from 'src/app/services/my-auth.service';
import { UserRole } from 'src/app/auth/UserRole';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'blog';
    faSignout = faSignOutAlt;
    faGoogle = faGoogle;
    faUser = faUser;


    currentUser: SocialUser;
    userRole: UserRole;

    constructor(
        private authService: MyAuthService,
        private api: ApiService,
        private swPush: SwPush
    ) {

        if (swPush.isEnabled) {
            swPush
                .requestSubscription({
                    serverPublicKey: environment.VAPID_PUBLIC,
                })
                .then(subscription => {
                    // send subscription to the server
                    console.log(subscription);
                    this.api.sendSubscriptionToTheServer(subscription).subscribe(res => {
                        console.log(res);
                    });
                    console.log("DONE");
                })
                .catch(console.error);
        }
    }

    ngOnInit() {
        this.authService.authState.subscribe((user) => {
            this.currentUser = user;
            console.log(user);
        });

        this.authService.currentRole.subscribe((userRole) => {
            if (userRole && userRole !== this.userRole) {
                this.userRole = userRole;
            }
        });
    }


    signIn() {
        this.authService.login(GoogleLoginProvider.PROVIDER_ID).then(
            res => console.log(res)
        );
    }

    logout() {
        this.authService.signOut();
    }
}
