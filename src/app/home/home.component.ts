import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Post } from '../models/Post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public posts: Array<Post>;
    constructor(public api: ApiService) { }


    ngOnInit() {
        this.api.getPosts().subscribe((posts) => {
            this.posts = posts;
        });
    }

}
