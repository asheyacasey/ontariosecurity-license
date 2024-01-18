import {Component} from '@angular/core';
import {AdminUserService} from "../../../services/admin/admin-user.service";
import {PagedAdminUsers} from "../../../models/admin/user";
import {ActivatedRoute} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {AbstractListingComponent} from "../abstract-listing-component";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends AbstractListingComponent<PagedAdminUsers> {

  constructor(
    searchService: AdminUserService,
    activatedRoute: ActivatedRoute,
    viewport: ViewportScroller
  ) {
    super(activatedRoute, viewport);
    this.searchService = searchService;
  }
}
