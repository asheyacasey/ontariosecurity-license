import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.scss', '../../shared/shared.scss']
})
export class LearnComponent implements OnInit {

  sectionTitle?: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedRoute
    this.router.navigate(['/learn', 1, 'quiz', 1]);
  }

  setSectionTitle(title: string): void {
    this.sectionTitle = title;
  }

}
