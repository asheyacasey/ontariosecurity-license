import {Pagination} from "./pagination";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

export interface AdminDiscountCodeCreate {
  name: string;
  enabled: boolean;
  validFrom: string | null;
  validUntil: string | null;
  discountPercent: number;
}


export interface AdminDiscountCode extends AdminDiscountCodeCreate{
  id: number;
  uses: number;
}

export interface PagedAdminDiscountCodes extends Pagination {
  items: AdminDiscountCode[];
}
