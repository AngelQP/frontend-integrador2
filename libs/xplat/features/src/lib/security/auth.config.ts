export class AuthConfiguration{
    
    public issuer? : string = ''

    public clientId : string = ''

    public openUri?: (uri: string) => void = (uri) => {
        location.href = uri;
    };
}