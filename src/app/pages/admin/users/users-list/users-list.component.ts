import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ViewportScroller} from "@angular/common";
import {AbstractListingComponent} from "../../abstract-listing-component";
import {PagedAdminUsers} from "../../../../models/admin/user";
import {AdminUserService} from "../../../../services/admin/admin-user.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent extends AbstractListingComponent<PagedAdminUsers> {

  constructor(
    searchService: AdminUserService,
    activatedRoute: ActivatedRoute,
    viewport: ViewportScroller
  ) {
    super(activatedRoute, viewport);
    this.searchService = searchService;
  }
}
