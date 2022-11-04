export interface Symbols {
    success:boolean,
    symbols:Object
}

export interface ConvertFilter {
    amount:string,
    to:string,
    from:string
}

export interface ConvertResult {
    date:string
    info:object
    query:ConvertFilter
    result:Number
    success:boolean
}
