import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {UserDetails} from "../../models/user";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {SelectableCourseProgressModule} from "../../pages/learn/selectable-course-progress-module";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() showHamburger: boolean = false;

  @Output() hamburgerClicked = new EventEmitter<boolean>();

  user: UserDetails | null = null;

  constructor(
    private router: Router,
    private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.user$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((details) => {
      this.user = details;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onHamburgerClicked(): void {
    this.hamburgerClicked.next(true);
  }

  signOut(): void {
    this.authService.signOut();
    this.router.navigate(['/']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToAdmin() {
    this.router.navigate(['/admin'])
  }
}
