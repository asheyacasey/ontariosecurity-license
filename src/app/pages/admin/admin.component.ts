import {Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss', '../../shared/shared.scss']
})
export class AdminComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  openMenu$: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openMenu(): void {
    this.openMenu$.next(true);
  }
}
