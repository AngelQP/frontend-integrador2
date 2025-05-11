import { IEnvironment } from './environment.interface';

/**
 * Workspace shared environment for ease of use across all shared code and apps
 * You can ignore this file - values here only used for unit testing
 * Real Values are filled in by each runtime/platform/app
 */
export const environment: IEnvironment = {
  production: false,
  endpoint: {
    direccionamiento: '/dev/api/direccionamiento/',
    desglose: '/dev/api/desglose/',
    client: '/dev/api/client/',
    tramarsa: '/dev/api/tramarsa/',
    maestro: '/dev/api/maestro/',
    security: '/dev/api/security/',
    fileblob: '/dev/api/fileblob/',
    sobreestadiacalc: '/dev/api/sobreestadia/calc/',
    sobreestadiaoperaciones: '/dev/api/sobreestadia/operaciones/',
    bancos: '/dev/api/bancos/',
    servicioskn: "/dev/api/servicioskn/",
    emisionbl: "/dev/api/emisionbl/",
    liquidacion: "/dev/api/liquidacion/",
    concesiones: "/dev/api/concesiones/",
    solicitudServicio: "/dev/api/solicitudservicio/",
    cobroslocales:  "/dev/api/cobroslocales/",
    recuperablesok:  "/dev/api/recuperablesok/"
  },
  security: {
    clientId: "pwebtram",
    issuer: "/login"
  }

};
