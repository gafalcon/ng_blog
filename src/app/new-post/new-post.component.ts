import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MyAuthService } from 'src/app/services/my-auth.service';
import { SocialUser } from 'angularx-social-login';
import { Post } from '../models/Post';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {


    public content = '<p>Initial Content</p>';
    public title: string;
    public subtitle: string;
    currentUser: SocialUser;

    constructor(private api: ApiService,
                private router: Router,
                private authService: MyAuthService,
                private notifier: NotificationsService
               ) { }

    public log({ event, editor }: any) {
        console.log(event);
        console.log(editor.getContent());
    }
    ngOnInit() {
        this.authService.authState.subscribe((user) => {
            this.currentUser = user;
        });
    }

    onSubmit() {
        if (this.content && this.title && this.subtitle) {
            const post = new Post(this.content, this.title, this.subtitle, this.currentUser.name);
            this.api.newPost(post).subscribe((res) => {
                console.log(res);

                this.notifier.success('Post created!');
                // this.router.navigate(['/']);
            });
        } else {
            this.notifier.warn('There are empty fields');
        }
    }
}
