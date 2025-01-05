import { inject, Injectable, signal } from '@angular/core';
import {
  Auth,
  authState,
  signOut,
  user,
  signInWithPopup,
  GoogleAuthProvider,
  ActionCodeSettings,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth = inject(Auth);
  authState = authState(this.auth);
  user = user(this.auth);

  logInWithGoogle = () => signInWithPopup(this.auth, new GoogleAuthProvider());

  sendAuthLink(email: string, acs: ActionCodeSettings) {
    return sendSignInLinkToEmail(this.auth, email, acs);
  }

  loginWithEmailLink() {
    if (isSignInWithEmailLink(this.auth, location.href)) {
      let email = localStorage.getItem('emailForSignIn');

      if (!email) {
        email = prompt('Veuillez fournir votre e-mail pour la confirmation');
      }

      signInWithEmailLink(this.auth, email!, location.href);
    }
  }

  logout = () => signOut(this.auth);
}
