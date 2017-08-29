import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ins-importe-form',
  templateUrl: './ins-importe-list-form.component.html',
  styles: []
})
export class InsImporteListFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      ninsfin: [null, Validators.required],
      ncygi: [null, Validators.required],     
    });
  }

}
