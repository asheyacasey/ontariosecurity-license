import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../../services/authentication.service";
import {UserLoginRequest, UserRegisterRequest} from "../../../models/user";
import {filter, switchMap, tap} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../../shared/shared.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const data = this.registerForm.value as UserRegisterRequest;
    this.authService.signUp(data).pipe(
      tap((err) => {
        if (err !== null) {
          // todo: notify
        }
      }),
      filter((err) => err === null),
      switchMap((err) => {
        return this.authService.signIn({
          username: this.registerForm.controls.email.value as string,
          password: this.registerForm.controls.password.value as string
        });
      })
    ).subscribe((user) => {
      this.router.navigate(['/start/course'])
    })
  }
}
