import {Component, OnInit} from '@angular/core';
import {LandingRegisterModalComponent} from "../register-modal/landing-register-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-money-back-guarantee',
  templateUrl: './money-back-guarantee.component.html',
  styleUrls: ['./money-back-guarantee.component.scss']
})
export class MoneyBackGuaranteeComponent implements OnInit {

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
