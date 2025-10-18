import { User } from "./userInterface";

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
  _id: string;
  p_id: string;
  recieve: string;
  status: {
    mode: string;
    user: User[];
  };

  image: {
    public_id: string;
    url: string;
  };

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

  productValidationLoading: boolean;
  productValidationSuccess: string | null;
  productValidationError: string | null;

  productImageLoading: boolean;
  productImageSuccess: string | null;
  productImageError: string | null;

  product: IGetProduct | null;
}

/* ============ Sample ============= */
export type ISampleProduct = {
  p_id: string;
  recieve: Date;
  status: {
    mode: string;
    user: User[];
  };

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

export type ISampleProcess = {
  process: string;
  spec: string;
  serial: string;
  value: string;
};

export interface ISampleProcessGet {
  name: string;
  spec: [
    {
      name: string;
      serial: string;
      value: string;
    }
  ];
}
export interface ISampleGetProduct {
  _id: string;
  p_id: string;
  recieve: string;
  status: {
    mode: string;
    user: User[];
  };

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
  process: ISampleProcessGet[];
}

export interface sampleProductState {
  sampleProductLoading: boolean;
  sampleProductSuccess: string | null;
  sampleProductError: string | null;

  sampleProcessLoading: boolean;
  sampleProcessSuccess: string | null;
  sampleProcessError: string | null;

  sampleUpDownLoading: boolean;
  sampleUpDownSuccess: string | null;
  sampleUpDownError: string | null;

  sampleProduct: ISampleGetProduct | null;
}
