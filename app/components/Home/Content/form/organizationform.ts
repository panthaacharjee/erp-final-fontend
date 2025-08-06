export interface buyer{
    name: string,
    code:string,
    address:string,
}

export interface venodor{
    buyer:string,
    name:string,
    code:string
}

export interface contact{
    vendor:string,
    name:string,
    mail:string,
    phone:string
}