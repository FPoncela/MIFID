import { PreFormComponent } from './pre-form/pre-form.component';
import { ContFormComponent } from './cont-form/cont-form.component';
import { PostFormComponent } from './post-form/post-form.component';

import { ImpCyGFormComponent } from './imp-cyg-form/imp-cyg-form.component';
import { InsImporteFormComponent } from './ins-importe-form/ins-importe-form.component';
import { InsFinancieroFormComponent } from './ins-financiero-form/ins-financiero-form.component';

import { ImpCyGListFormComponent } from './imp-cyg-form/imp-cyg-list-form.component';
import { InsImporteListFormComponent } from './ins-importe-form/ins-importe-list-form.component';
import { InsFinancieroListFormComponent } from './ins-financiero-form/ins-financiero-list-form.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'precontractual', component: PreFormComponent },
      { path: 'contractual', component: ContFormComponent },
      { path: 'postcontractual', component: PostFormComponent },      
      { path: 'importecyg/alta', component: ImpCyGFormComponent },
      { path: 'insimporte/alta', component: InsImporteFormComponent },
      { path: 'insfinanciero/alta', component: InsFinancieroFormComponent },
      { path: 'importecyg', component: ImpCyGListFormComponent },
      { path: 'insimporte', component: InsImporteListFormComponent },
      { path: 'insfinanciero', component: InsFinancieroListFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
