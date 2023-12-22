import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";
import {UserLoginRequest, UserRegisterRequest} from "../../models/user";
import {filter, switchMap, tap} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../shared/shared.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })


  constructor(private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const data = this.loginForm.value as UserLoginRequest;
    this.authService.signIn(data).pipe(
      filter((details) => details !== null),
    ).subscribe((user) => {
      this.router.navigate(['/start/course'])
    })
  }
}
