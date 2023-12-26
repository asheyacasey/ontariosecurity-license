import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectableCourseProgressModule} from "../selectable-course-progress-module";

@Component({
  selector: 'app-modules-list',
  templateUrl: './modules-list.component.html',
  styleUrls: ['./modules-list.component.scss']
})
export class ModulesListComponent implements OnInit {

  @Input() modules!: SelectableCourseProgressModule[];

  @Output() selectedModuleChanged = new EventEmitter<SelectableCourseProgressModule>();

  constructor() { }

  ngOnInit(): void {
  }

  onSelectionChange(module: SelectableCourseProgressModule): void {
    this.selectedModuleChanged.next(module);
  }

}
