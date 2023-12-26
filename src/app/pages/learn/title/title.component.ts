import {Component, OnDestroy, OnInit} from '@angular/core';
import {LearnService} from "../../../services/learn.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss', '../../../shared/shared.scss']
})
export class TitleComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  sectionTitle: string = '';

  constructor(private learnService: LearnService) {
  }

  ngOnInit(): void {
    this.learnService.title$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((title) => {
      if (!title) {
        return;
      }
      this.sectionTitle = title;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
