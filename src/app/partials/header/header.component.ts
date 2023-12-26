import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserDetails} from "../../models/user";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user: UserDetails | null = null;

  constructor(
    private router: Router,
    private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.user$.subscribe((details) => {
      this.user = details;
    })
  }

  signOut(): void {
    this.authService.signOut();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
