import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-imp-cyg-form',
  templateUrl: './imp-cyg-list-form.component.html',
  styles: []
})
export class ImpCyGListFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      ncygi: [null, Validators.required],     
    });
  }

  
  
}
