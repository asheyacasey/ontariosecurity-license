import {Component, OnInit} from '@angular/core';
import {LandingRegisterModalComponent} from "../register-modal/landing-register-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-licensing-process',
  templateUrl: './licensing-process.component.html',
  styleUrls: ['./licensing-process.component.scss']
})
export class LicensingProcessComponent implements OnInit {

  constructor(
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
  }

  goToSignUp(): void {
    this.modalService.open(LandingRegisterModalComponent, {size: 'lg'});
  }
}
