interface ILoginHistory {
  timestamp: Date;
  ipAddress: string | undefined;
  userAgent?: string;
}

export interface User {
    _id:string,
    employeeId?:string,
    name: string,
    userName:string,
    mainSalary:number,
    email:string,
    grade:string,
    account:string,
    authentication:{
        password: string,
        sessionToken:string
    }
    image?:{
        public_id :string,
        url :string
    }
    role: string,
    joinDate:Date
    createdAt:Date,
    loginHistory: ILoginHistory[],
    section:string,
    category:string,
    designation:string,
    department:string,
    address:{
        vill:string,
        thana:string,
        post:string,
        postCode:number,
        district:string
    },
    personalInformation:{
        father : string,
        mother:string,
        blood:string,
        nid:string,
        dob: Date,
        phone:string
    },
    education:{
        certificate:string,
        qualification:string,
    },
    nominee:{
        name:string,
        relation:string
    },
    bank:{
        account:string,
        name :string,
        route:number
    },
    salary:{
      basic:number | null,
      home:number | null,
      medical:number | null,
      conveyance:number | null,
      food:number | null,
      special:number | null
    }
}


export interface UserState {
  isAuthenticated: boolean;
  status: boolean;
  loading: boolean;
  user: User | null;
  error: string | null;
  success: string | null;
}

export interface HrUserState{
  status: boolean;
  loading: boolean;
  user: User | null;
  error: string | null;
  success: boolean | null;
  message:string | null;

  users: User[]
  filterUsers: User[]
}