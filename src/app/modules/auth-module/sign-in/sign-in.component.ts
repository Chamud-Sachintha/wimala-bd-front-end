import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm!: FormGroup;
  userEmail!: string;
  password!: string;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.createSignInForm();
  }

  onSubmitSignInForm() {
    this.userEmail = this.signInForm.controls['userEmail'].value;
    this.password = this.signInForm.controls['password'].value;
    
    if (this.userEmail === 'chamud123@gmail.com' && this. password === '123') {
      this.router.navigate(['app/admin']);
    }
  }

  createSignInForm() {
    this.signInForm = this.formBuilder.group({
      userEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
