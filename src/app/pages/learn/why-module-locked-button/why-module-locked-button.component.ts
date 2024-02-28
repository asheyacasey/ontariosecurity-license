import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WhyModuleLockedModalComponent} from "../why-module-locked-modal/why-module-locked-modal.component";

@Component({
  selector: 'app-why-module-locked-button',
  templateUrl: './why-module-locked-button.component.html',
  styleUrls: ['./why-module-locked-button.component.scss']
})
export class WhyModuleLockedButtonComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  openModal(): void {
    this.modalService.open(WhyModuleLockedModalComponent, {size: 'lg'});
  }

}
