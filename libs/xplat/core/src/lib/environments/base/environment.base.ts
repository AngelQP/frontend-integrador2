import { IEnvironment } from '../environment.interface';

/**
 * Reduce the most commonly used environment values here
 */
export const environmentBase: IEnvironment = {
  production: false,
  endpoint:{
    direccionamiento: '/dev/api/direccionamiento/',
    desglose: '/dev/api/desglose/',
    client : '/dev/api/client/',
    tramarsa : '/dev/api/tramarsa/',
    maestro : '/dev/api/maestro/',
    login: '/dev/api/security/',
    fileblob : '/dev/api/fileblob/',
    sobreestadiacalc : '/dev/api/sobreestadia/calc',
    sobreestadiaoperaciones : '/dev/api/sobreestadia/operaciones',
  },
  security:{
    clientId:"pwebtram",
    issuer:"/login"
  }
  
};
