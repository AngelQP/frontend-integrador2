import { environment } from "@tramarsa/xplat/core";
import { AuthConfiguration } from "./auth.config";

export const authConfig: AuthConfiguration= Object.assign(new AuthConfiguration(),{
    issuer:environment.security.issuer,
    clientId:environment.security.clientId,
    
});