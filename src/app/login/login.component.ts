import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup; 
  submitted: boolean = false; 
  invalidLogin: boolean = false;
  //constructor dependency injection
  constructor(private formBuilder: FormBuilder, private router: Router,) { } 
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) { 
      return; 
    }
    if (this.loginForm.controls.email.value == "smita@gmail.com" && this.loginForm.controls.password.value == "password") 
    {
      localStorage.setItem("username", this.loginForm.controls.email.value);
      this.router.navigate(['list-user']);
    } else { 
      this.invalidLogin = true; 
    }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required, 
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
    ],
      password: ['', Validators.required]
  });
}
}