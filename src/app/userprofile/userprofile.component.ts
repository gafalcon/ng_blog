import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Post } from '../models/Post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

    public posts: Array<Post> = [];

    constructor(private api: ApiService,
                private route: ActivatedRoute
               ) { }

    ngOnInit() {
        const userId = this.route.snapshot.paramMap.get('user_id');
        this.api.getPostsByUser(userId).subscribe(posts => this.posts = posts);
    }

}
