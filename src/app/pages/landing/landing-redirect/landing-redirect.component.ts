import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing-redirect',
  templateUrl: './landing-redirect.component.html',
  styleUrls: ['./landing-redirect.component.scss']
})
export class LandingRedirectComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.navigate(
      ['/'],
      {
        fragment: this.router.url.replace('/', '')
      }
    );
  }

}
