import { Component, OnInit } from '@angular/core';
import {AbstractListingComponent} from "../../abstract-listing-component";
import {PagedAdminDiscountCodes} from "../../../../models/admin/discount-code";
import {AdminDiscountCodeService} from "../../../../services/admin/admin-discount-code.service";
import {ActivatedRoute} from "@angular/router";
import {ViewportScroller} from "@angular/common";

@Component({
  selector: 'app-discount-codes-list',
  templateUrl: './discount-codes-list.component.html',
  styleUrls: ['./discount-codes-list.component.scss']
})
export class DiscountCodesListComponent extends AbstractListingComponent<PagedAdminDiscountCodes> {

  constructor(
    searchService: AdminDiscountCodeService,
    activatedRoute: ActivatedRoute,
    viewport: ViewportScroller
  ) {
    super(activatedRoute, viewport);
    this.searchService = searchService;
  }

}
