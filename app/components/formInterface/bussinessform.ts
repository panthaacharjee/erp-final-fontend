export interface buyer {
  name: string;
  code: string;
  address: string;
}

export interface venodor {
  buyer: string;
  name: string;
  code: string;
}

export interface contact {
  vendor: string;
  name: string;
  mail: string;
  phone: string;
}

export interface line {
  name: string;
  code: string;
  others: string;
  category?: category[];
  process?: Iprocess[];
}

export interface category {
  line: string;
  category: string;
  code: string;
}

export interface program {
  buyer: string;
  name: string;
  vendor: string;
}

export interface Iprocess {
  title: string;
  line: string;
  spec?: Ispecification[];
}

export interface Ispecification {
  title: string;
  serial: Iserial[];
}

export interface Iserial {
  title: string;
  item: Iitem[];
}

export interface Iitem {
  title: string;
}
