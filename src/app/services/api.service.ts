import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private apiURL = `${environment.apiURL}`;
    constructor(private http: HttpClient) { }

    newPost(post: Post): Observable<any> {
        return this.http.post(`${this.apiURL}/posts/`, post);
    }

    getPosts(): Observable<Array<Post>> {
        return this.http.get<Array<Post>>(`${this.apiURL}/posts/`);
    }

    getPost(postId: string): Observable<Post> {
        return this.http.get<Post>(`${this.apiURL}/posts/${postId}`);
    }

    getPostsByUser(userId: string): Observable<Array<Post>> {
        return this.http.get<Array<Post>>(`${this.apiURL}/posts/?createdBy=${userId}`);
    }

    deletePost(postId: string) {
        return this.http.delete(`${this.apiURL}/posts/${postId}`);
    }

    editPost(post: Post) {
        return this.http.put(`${this.apiURL}/posts/${post._id}`, post);
    }

    /* Users */
    getUser(userId?: string): Observable<User> {
        if (userId) {
            return this.http.get<User>(`${this.apiURL}/users/${userId}`);
        } else {
            return this.http.get<User>(`${this.apiURL}/users/profile`);
        }
    }

    getUsers(): Observable<Array<User>> {
        return this.http.get<Array<User>>(`${this.apiURL}/users`);
    }

    // Push notifications
    sendSubscriptionToTheServer(subscription: PushSubscription) {
        console.log("Sending subscription");
        return this.http.post(`${this.apiURL}/users/subscribe`, subscription);
    }
}
