import {Pagination} from "./pagination";
import {AdminUser} from "./user";
import {AdminCourse} from "./course";

export interface AdminBillingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  country: string;
  province: string;
}

export interface AdminPayment extends AdminBillingDetails {
  id: number;
  createdAt: string;
  user: AdminUser;
  course: AdminCourse;
  transactionId: string;
  status: string;
  paidAmount: number;
  discountCodeName?: string;
  discountCodePercent?: number;
}

export interface PagedAdminPayments extends Pagination {
  items: AdminPayment[];
}
