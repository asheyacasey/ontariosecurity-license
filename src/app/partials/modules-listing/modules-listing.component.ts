import {Component, Input, OnInit} from '@angular/core';
import {SelectableCourseOverview} from "../../models/selectable-course-overview";

@Component({
  selector: 'app-modules-listing',
  templateUrl: './modules-listing.component.html',
  styleUrls: ['./modules-listing.component.scss']
})
export class ModulesListingComponent implements OnInit {

  @Input() course!: SelectableCourseOverview

  constructor() { }

  ngOnInit(): void {
  }

}
