import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDgn4o-Ue1Lli1wR0cLYTdevwZ4fDIy3U8",
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorRes) => {
          let errorMessage = "An unknown error occured";
          if (!errorRes.error || !errorRes.error.error) {
            return errorMessage;
          }
          switch (errorRes.error.error.message) {
            case "EMAIL_EXISTS":
              errorMessage =
                "The email address is already in use by another account.";
          }
          return throwError(errorMessage);
        })
      );
  }
}
