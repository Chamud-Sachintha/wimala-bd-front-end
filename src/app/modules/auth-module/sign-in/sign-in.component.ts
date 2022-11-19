import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JWTRequest } from 'src/app/models/JWTRequest';
import { UserModel } from 'src/app/models/UserModel';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  userModel = new UserModel();
  jwtRequest = new JWTRequest();
  signInForm!: FormGroup;
  userEmail!: string;
  password!: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.createSignInForm();
  }

  onSubmitSignInForm() {
    this.userEmail = this.signInForm.controls['userEmail'].value;
    this.password = this.signInForm.controls['password'].value;
    
    this.jwtRequest.userName = this.userEmail;
    this.jwtRequest.password = this.password;

    this.authService.authenticateUser(this.jwtRequest).subscribe((resp) => {
      sessionStorage.setItem("firstName", resp.user.firstName);
      sessionStorage.setItem("lastName", resp.user.lastName);
      sessionStorage.setItem("role", resp.user.role[0].roleName);
      sessionStorage.setItem("id_token", resp.jwtToken);

      this.router.navigate(['app/admin']);
    },(err) => {
      console.log(err.status);
    });
  }

  createSignInForm() {
    this.signInForm = this.formBuilder.group({
      userEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
