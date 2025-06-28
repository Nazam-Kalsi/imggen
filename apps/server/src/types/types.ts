export interface apiResT {
    statusCode:number,
    message:string,
    success:boolean,
    data?:any
}

export interface apiErrT {
    statusCode:number,
    message:string,
}

