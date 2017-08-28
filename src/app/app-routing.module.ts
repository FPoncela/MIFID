import { PreFormComponent } from './pre-form/pre-form.component';
import { ContFormComponent } from './cont-form/cont-form.component';
import { PostFormComponent } from './post-form/post-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'precontractual', component: PreFormComponent },
      { path: 'contractual', component: ContFormComponent },
      { path: 'postcontractual', component: PostFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
