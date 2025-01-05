import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/firebase/auth.service';
import { APP_NAME, COMPANY_NAME } from '../../app.constants';
import { LoginSkeltonComponent } from './login-skelton.component';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styles: `
    .divider {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 1rem 0;

      mat-divider {
        width: 35%;
      }
    }
  `,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSnackBarModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    LoginSkeltonComponent,
  ],
})
export default class LoginComponent implements OnInit, OnDestroy {
  appName = APP_NAME;
  companyName = COMPANY_NAME;
  date = new Date();
  loading = signal(true);
  authSub!: Subscription;
  private auth = inject(AuthService);
  private router = inject(Router);
  emailSent = signal('');

  resetState = () => this.emailSent.set('');

  emailFormSubmit(form: NgForm) {
    const email = form.value.email;

    const actionCodeSettings = {
      url: `${location.origin}${this.router.url}`,
      handleCodeInApp: true,
    };

    this.auth.sendAuthLink(email, actionCodeSettings);
    localStorage.setItem('emailForSignIn', email);
    this.emailSent.set(email);
    form.reset();
  }

  loginWithGoogle = async () => {
    try {
      this.loading.set(true);
      await this.auth.logInWithGoogle();
      this.loading.set(false);
    } catch (exception) {
      this.loading.set(false);
      location.reload();
      console.log(exception);
    }
  };

  ngOnInit(): void {
    //watching auth state
    this.authSub = this.auth.authState.subscribe((user: User | null) => {
      this.loading.set(false);
      //On email redirection, initialize authentication
      if (this.router.url.includes('login?apiKey=')) {
        this.loading.set(true);
        this.auth.loginWithEmailLink();
      }

      if (user) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }
}
