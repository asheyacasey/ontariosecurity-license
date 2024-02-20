import {Component, OnInit} from '@angular/core';
import {JobService} from "../../../services/job.service";
import {JobsCountCity} from "../../../models/job";
import {BehaviorSubject, finalize, Subject} from "rxjs";

@Component({
  selector: 'app-job-offers-count',
  templateUrl: './job-offers-count.component.html',
  styleUrls: ['./job-offers-count.component.scss']
})
export class JobOffersCountComponent implements OnInit {
  isLoading$: Subject<boolean> = new BehaviorSubject<boolean>(true);

  count!: number;
  city!: string;

  constructor(private jobService: JobService) {
  }

  ngOnInit(): void {
    this.isLoading$.next(true);
    this.jobService.getJobOffersCount().pipe(
      finalize(() => this.isLoading$.next(false))
    ).subscribe({
      next: (offers: JobsCountCity) => {
        this.count = offers.count;
        this.city = offers.city;
      },
      error: () => {
        this.count = 596;
        this.city = 'Toronto';
      }
    })
  }

}
