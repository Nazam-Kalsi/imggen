export class ApiErr extends Error {
    statusCode:number;
    override message:string;
    errors:string[];
    override stack:any;
    constructor(statusCode:number,message='invalid',errors=[],stack=''){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.errors = errors;
         if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }

}