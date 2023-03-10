import { Component, OnInit } from '@angular/core';
import{ FormGroup, FormBuilder, Validators } from'@angular/forms';
import { UserService } from '../services/user.service';
import {Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  addForm: FormGroup;
  submitted: boolean = false;  
  constructor(private formBuilder: FormBuilder, 
    private router: Router, private userService: UserService) { }
    ngOnInit() {
      this.addForm = this.formBuilder
      .group(
        {id:[],firstName: ['', Validators.required, Validators.pattern("^[a-zA-Z]{3,}$")],lastName:['', Validators.required,, Validators.pattern("^[a-zA-Z]{3,}$")],email: ['', Validators.required]}
        );
      }
    onSubmit() {
      this.submitted = true;
      if(this.addForm.invalid){
        return;
      }
      this.userService
      .createUser(this.addForm.value)
      .subscribe( data => { 
        this.router.navigate(['list-user']);
    });
  }
}
