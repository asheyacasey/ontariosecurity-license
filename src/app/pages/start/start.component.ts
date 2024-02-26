import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss', '../../shared/shared.scss']
})
export class StartComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  showMenu: boolean = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      takeUntil(this.destroy$)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showMenu = !event.urlAfterRedirects.includes('start/tell-us-about-you');
      }
    });
  }

  ngOnInit(): void {


  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
