import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  isLoginMode = true;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    let email = form.value.email;
    let password = form.value.password;

    if (this.isLoginMode) {
    } else {
      this.authService.signUp(email, password).subscribe(
        (resData) => {
          console.log(resData);
        },
        (error) => {
          console.log(error);
        }
      );
    }

    form.reset();
  }
}
