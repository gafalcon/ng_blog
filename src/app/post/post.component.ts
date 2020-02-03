import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Post } from '../models/Post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    public post: Post;

    constructor(private api: ApiService,
                private route: ActivatedRoute
               ) { }

    ngOnInit() {
        const postId = this.route.snapshot.paramMap.get('post_id');
        this.api.getPost(postId).subscribe(post => this.post = post);
    }

}
