import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-why-module-locked-modal',
  templateUrl: './why-module-locked-modal.component.html',
  styleUrls: ['./why-module-locked-modal.component.scss']
})
export class WhyModuleLockedModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}
