

export class QueryStringBuilder {

    queryItems : KeyValueQueryString[]=[]

    constructor() { }

    public toDateStringUtc(date: Date|any): string{
        if (date){
            const value = JSON.stringify(date);
            if (value)
                return value.replace(/['"]+/g, '');
        }
        
        return "";
    }
    public toDateStringUtcEncode(date: Date|any): string{
        const d = this.toDateStringUtc(date)
        if (d) return encodeURIComponent(d)
            
       return d; 
    }

    public addOrEmpty (key:string, value: any):QueryStringBuilder{
        
        this.queryItems.push({key:key, value:value ?? ""})
        
            
        return this;
    }
    public add (key:string, value: any):QueryStringBuilder{
        if (value){
            this.queryItems.push({key:key, value:value})
        }
            
        return this;
    }

    public addDate (key:string, value: any):QueryStringBuilder{
        if (value){
            const dvalue = this.toDateStringUtc(value);
            this.add(key, dvalue);
        }
            
        return this;
    }

    public build (simbolInit: boolean = true):string{
        const query = this.queryItems
            .map((qs:KeyValueQueryString)=> `${encodeURIComponent(qs.key)}=${encodeURIComponent(qs.value)}`)
            .join('&');
        if (query && simbolInit)
            return `?${query}`;
        return query;
    }
}

export interface KeyValueQueryString{
    key:string,
    value:any
}