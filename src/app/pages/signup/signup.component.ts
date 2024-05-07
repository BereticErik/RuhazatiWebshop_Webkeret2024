import { Location } from '@angular/common';
import { Component, createPlatform, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { DbService } from '../../shared/services/db.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  dbuser = "useer";
  signUpForm = new FormGroup({
    email:  new FormControl('',Validators.required),
    username:  new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    repassword: new FormControl('',Validators.required),
    name: new FormGroup({
      firstname: new FormControl('',Validators.required),
      lastname: new FormControl('',Validators.required)
    })
  });

  constructor(private location:Location,private authServ: AuthService,private dbservice:DbService,private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const email = this.signUpForm.get('email')?.value;
    const password = this.signUpForm.get('password')?.value;
    const username = this.signUpForm.get('username')?.value;
    const firstName = this.signUpForm.get('name.firstname')?.value;
    const lastName = this.signUpForm.get('name.lastname')?.value;

    if (!email || !password || !username || !firstName || !lastName) {
      window.alert('Please fill in all the required fields.');
      return;
    }

    if (this.signUpForm.get('password')?.value != this.signUpForm.get('repassword')?.value) {
      window.alert('Jelszavaid nem egyeznek');
      return;
    }

    console.log(this.signUpForm.value);
    this.authServ.signup(email, password).then(cred => {
      const user: User = {
        id: cred.user?.uid as string,
        email: email,
        username: username,
        name: {
          firstname: firstName,
          lastname: lastName
        },
      };
      console.log(user);
      this.dbservice.createnewUser(user);
      window.alert('Sikeres regisztracio');
      this.router.navigateByUrl('main');
    }).catch(error => {
      window.alert("Valami hiba tortent");
      this.router.navigateByUrl("login");
      console.error(error);
    });
  }

  goBack(){
    this.location.back();
  }

  clearForm(){
    this.signUpForm.reset();
  }

}
