import {Pagination} from "./pagination";

export interface AdminUser {
  id: number;
  email: string;
  registeredAt: string;
  admin: boolean;
  paymentsCount: number;
}

export interface PagedAdminUsers extends Pagination {
  items: AdminUser[];
}
