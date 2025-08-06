export interface contact{
    name:string,
    mail:string,
    number:string,
}

export interface vendor{
    title:string,
    code:string,
    contact?: contact[]
}
export interface buyer{
    title:string,
    conde:string,
    vendor?: vendor[]
}


export interface organizationState{
    status: boolean,

    buyerLoading: boolean,
    buyerSuccess: string | null,
    buyerError : string | null,

    vendorLoading: boolean,
    vendorSuccess: string | null,
    vendorError : string | null,

    contactLoading: boolean,
    contactSuccess: string | null,
    contactError : string | null,

    organizationLoading:boolean,
    organizationError:string | null,
    organization:buyer[]
}