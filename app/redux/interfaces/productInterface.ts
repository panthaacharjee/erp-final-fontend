export type IProduct = {
  p_id: string;
  recieve: Date;
  status: boolean;

  buyer: string;
  vendor: string;
  contact: string;
  sales: string;

  line: string;
  category: string;
  desc: string;
  ref: string;
  code: string;
  hs_code: string;

  height: number;
  width: number;
  length: number;
  dimension_unit: string;
  page_part: string;
  set: string;

  weight: number;
  weight_per_pcs: string;
  weight_unit: string;

  order_unit: string;
  moq: number;
  moq_unit: string;

  last_price: Date;
  currency: string;
  full_part: number;
  half_part: number;
  price_unit: string;

  sample_date: Date;
  comments: string;
};

export type IProcess = {
  process: string;
  spec: string;
  serial: string;
  value: string;
};

export interface IProcessGet {
  name: string;
  spec: [
    {
      name: string;
      serial: string;
      value: string;
    }
  ];
}
export interface IGetProduct {
  p_id: string;
  recieve: string;
  status: boolean;

  contactDetails: {
    buyer: string;
    vendor: string;
    contact: string;
    sales: string;
  };

  product: {
    line: string;
    category: string;
    desc: string;
    code: string;
    hs_code: string;
    ref: string;
  };

  dimensionDetails: {
    page: string;
    set: string;
    measure: {
      width: number;
      height: number;
      length: number;
      dimension_unit: string;
    };
  };
  weight: {
    per_pcs: string;
    weight_value: number;
    weight_unit: string;
  };
  quantity: {
    unit_type: string;
    moq: number;
    moq_unit: string;
  };
  price: {
    last_price: Date;
    currency: string;
    price_unit: string;
    full_part: number;
    half_part: number;
  };
  sample_submission: {
    date: Date;
    buyer_comment: string;
  };
  process: IProcessGet[];
}

export interface productState {
  productLoading: boolean;
  productSuccess: string | null;
  productError: string | null;

  processLoading: boolean;
  processSuccess: string | null;
  processError: string | null;

  upDownLoading: boolean;
  upDownSuccess: string | null;
  upDownError: string | null;

  product: IGetProduct | null;
}
