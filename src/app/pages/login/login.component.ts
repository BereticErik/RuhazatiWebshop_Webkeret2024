import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';
import { error } from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');
  loginError: boolean = false; // Variable to track login error

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private router: Router, private loadingService: FakeLoadingService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  async login() {
    this.loading = true;
    this.loginError = false;

    try {
      await this.authService.login(this.email.value as string, this.password.value as string);
      this.router.navigateByUrl('/main');
    } finally {
      this.loading = false;
    }
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

}
