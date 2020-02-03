import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule } from '@angular/forms';
import { NewPostComponent } from './new-post/new-post.component';
import { PostComponent } from './post/post.component';
import { HomeComponent } from './home/home.component';

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { environment } from '../environments/environment';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(environment.googleAuthId)
    }
]);

export function provideConfig() {
    return config;
}

@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    PostComponent,
    HomeComponent,
    UserprofileComponent
  ],
  imports: [
      BrowserModule,
      BrowserAnimationsModule,
      AppRoutingModule,
      FormsModule,
      EditorModule,
      SocialLoginModule,
      HttpClientModule,
      FontAwesomeModule,
      NgbModule,
      SimpleNotificationsModule.forRoot({
          position: ['top', 'right'],
          timeOut: 5000,
          showProgressBar: true,
          maxStack: 3
      }),
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
