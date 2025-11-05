import { IGetProduct } from "./productInterface";

export type IOrder = {
  orderId: string;
  orderDate: Date;

  buyer: string;
  buyerRef: string;
  vendor: string;
  vendorRef: string;
  contact: string;
  sales: string;
  req_date: string;
  season: string;

  product: string;
  serial: number;
  line: string;
  category: string;
  desc: string;
  model: string;
  item_pact_art: string;
  style_cc_iman: string;
  variable: string;
  gmts_color: string;
  size_age: string;
  ean_number: string;
  order_qty: number;
  order_unit: string;
  page_part: number;
  base_qty_full_part: number;
  base_qty_half_part: number;

  isDetails: string;
  isSize: boolean;
};
export type IOrderDetails = {
  product: IGetProduct;
  serial: number;
  line: string;
  category: string;
  desc: string;
  model: string;
  item_pact_art: string;
  style_cc_iman: string;
  variable: string;
  gmts_color: string;
  size_age: string;
  ean_number: string;
  order_qty: number;
  order_unit: string;
  page_part: number;
  base_qty_full_part: number;
  base_qty_half_part: number;
};

export type IGetOrder = {
  _id: string;
  orderId: string;
  orderDate: Date;
  user: string;

  status: {
    mode: string;
    user: string;
    batchJob: string;
  };
  booking: {
    public_id: string;
    url: string;
  };
  artwork: {
    public_id: string;
    url: string;
  };

  contactDetails: {
    buyer: string;
    vendor: string;
    buyerRef: string;
    vendorRef: string;
    contact: string;
    sales: string;
    req_date: Date;
    season: string;
  };

  orderDetails: IOrderDetails[];
};

export interface orderState {
  orderLoading: boolean;
  orderSuccess: string | null;
  orderError: string | null;
  bookingLoading: boolean;
  bookingSuccess: string | null;
  bookingError: string | null;

  order: IGetOrder | null;
}
