/**
 * Workspace shared environment properties
 */
export interface IEnvironment {
  production?: boolean;
  endpoint?: any,
  security:{
    clientId:string,
    issuer:string
  }
  
}
