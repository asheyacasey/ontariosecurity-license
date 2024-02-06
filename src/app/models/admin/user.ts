import {Pagination} from "./pagination";

export interface AdminUser {
  id: number;
  email: string;
  registeredAt: string;
  admin: boolean;
  paymentsCount: number;
  courseAccessesCount: number;
  phone: string;
}

export interface PagedAdminUsers extends Pagination {
  items: AdminUser[];
}

export interface AdminUserBulkCreate {
  emails: string[];
  courseId: number;
}
