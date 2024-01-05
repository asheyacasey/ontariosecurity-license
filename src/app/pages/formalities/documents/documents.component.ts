import {Component, Input, OnInit} from '@angular/core';
import {CourseProgressOverview} from "../../../models/course";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss', '../../../shared/shared.scss']
})
export class DocumentsComponent implements OnInit {

  @Input() courseProgressOverview?: CourseProgressOverview;

  constructor() { }

  ngOnInit(): void {
  }

}
