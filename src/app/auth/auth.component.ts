import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

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
    this.isLoading = true;
    if (this.isLoginMode) {
    } else {
      this.authService.signUp(email, password).subscribe(
        (resData) => {
          this.isLoading = false;
          console.log(resData);
        },
        (error) => {
          this.error = "An error occured";
          console.log(error);
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }
}
