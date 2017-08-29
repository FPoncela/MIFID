import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PreFormComponent } from './pre-form/pre-form.component';
import { ContFormComponent } from './cont-form/cont-form.component';
import { PostFormComponent } from './post-form/post-form.component';

import { ImpCyGFormComponent } from './imp-cyg-form/imp-cyg-form.component';
import { InsImporteFormComponent } from './ins-importe-form/ins-importe-form.component';
import { InsFinancieroFormComponent } from './ins-financiero-form/ins-financiero-form.component';

import { ImpCyGListFormComponent } from './imp-cyg-form/imp-cyg-list-form.component';
import { InsImporteListFormComponent } from './ins-importe-form/ins-importe-list-form.component';
import { InsFinancieroListFormComponent } from './ins-financiero-form/ins-financiero-list-form.component';

import { FieldErrorDisplayComponent } from './field-error-display/field-error-display.component';



@NgModule({
  declarations: [
    AppComponent,
    PreFormComponent,
    ContFormComponent,
    PostFormComponent,
    ImpCyGFormComponent,
    InsImporteFormComponent,
    InsFinancieroFormComponent,    
    ImpCyGListFormComponent,
    InsImporteListFormComponent,
    InsFinancieroListFormComponent,
    FieldErrorDisplayComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
