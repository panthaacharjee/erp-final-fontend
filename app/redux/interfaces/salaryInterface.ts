
export interface SalaryState {
  status:boolean,
  
  salaryLoading:boolean,
  salaryError: string | null,
  salaryMessage:string | null,

  singleSalaryLoading:boolean,
  singleSalaryMessage: string | null,
  singleSalaryError : string | null,

  salaryPdfLoading: boolean,
  salaryPdfMessage: string | null
  salaryPdfError : string | null,
}

