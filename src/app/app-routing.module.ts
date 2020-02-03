import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { NewPostComponent } from './new-post/new-post.component';
import { UserprofileComponent } from './userprofile/userprofile.component';


const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'post/new', component: NewPostComponent},
    { path: 'post/:post_id', component: PostComponent},
    { path: 'user/:user_id', component: UserprofileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
