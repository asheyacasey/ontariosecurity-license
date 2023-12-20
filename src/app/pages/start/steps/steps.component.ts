import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {RegisterStep} from "./register-step";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  steps: RegisterStep[] = [
    {
      number: '01',
      title: 'Sign up',
      completed: false,
      active: false,
      link: ['/start', 'register']
    },
    {
      number: '02',
      title: 'Course',
      completed: false,
      active: false,
      link: ['/start', 'course']
    },
    {
      number: '03',
      title: 'Payment',
      completed: false,
      active: false,
      link: ['/start', 'pay']
    }
  ]

  constructor(private router: Router) {
    this.subscriptions.push(router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        const currentUrl = e.urlAfterRedirects;
        let currentFound = false;

        if (currentUrl === '/start/completed') {
          currentFound = true;
        }

        for (let index = this.steps.length - 1; index >= 0; index--) {
          const step: RegisterStep = this.steps[index];
          if (currentFound) {
            step.active = false;
            step.completed = true;
          } else {
            if (this.currentUrlMatches(currentUrl, step.link)) {
              currentFound = true;
              step.active = true;
              step.completed = false;
            } else {
              step.active = false;
              step.completed = false;
            }
          }
        }
      }
    }));
  }

  ngOnInit(): void {

  }

  currentUrlMatches(targetUrl: string, parts: string[]): boolean {
    return targetUrl === parts.join('/');
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe());
  }

}
