import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ins-financiero-form',
  templateUrl: './ins-financiero-list-form.component.html',
  styles: []
})
export class InsFinancieroListFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      ninsfin: [null, Validators.required],        
    });
  }

  
}
