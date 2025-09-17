export interface contact {
  name: string;
  mail: string;
  number: string;
}

export interface vendor {
  title: string;
  code: string;
  contact?: contact[];
  program?: program[];
}
export interface buyer {
  title: string;
  conde: string;
  vendor?: vendor[];
}

export interface organizationState {
  status: boolean;

  buyerLoading: boolean;
  buyerSuccess: string | null;
  buyerError: string | null;

  vendorLoading: boolean;
  vendorSuccess: string | null;
  vendorError: string | null;

  contactLoading: boolean;
  contactSuccess: string | null;
  contactError: string | null;

  organizationLoading: boolean;
  organizationError: string | null;
  organization: buyer[];
}

export interface line {
  name: string;
  code: string;
  others: string;
  category?: category[];
  process?: process[];
}

export interface category {
  line: string;
  category: string;
  code: string;
}

export interface program {
  buyer: string;
  name: string;
  others: string;
}

export interface productDetailState {
  lineLoading: boolean;
  lineSuccess: string | null;
  lineError: string | null;

  categoryLoading: boolean;
  categorySuccess: string | null;
  categoryError: string | null;

  programLoading: boolean;
  programSuccess: string | null;
  programError: string | null;

  getLineLoading: boolean;
  getLine: line[];
  getLineError: string | null;
}

export interface process {
  title: string;
  spec?: specification[];
}

export interface specification {
  title: string;
  serial?: serial[];
}

export interface serial {
  title: string;
  item?: item[];
}

export interface item {
  title: string;
}

export interface productProcessState {
  processLoading: boolean;
  processSuccess: string | null;
  processError: string | null;

  specLoading: boolean;
  specSuccess: string | null;
  specError: string | null;

  serialLoading: boolean;
  serialSuccess: string | null;
  serialError: string | null;

  itemLoading: boolean;
  itemSuccess: string | null;
  itemError: string | null;
}
