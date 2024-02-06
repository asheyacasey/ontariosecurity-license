import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {GoogleTagManagerService} from "angular-google-tag-manager";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'guard-training-frontend';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }
}
