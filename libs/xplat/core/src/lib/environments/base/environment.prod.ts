import { IEnvironment } from '@tramarsa/xplat/core';
import { deepMerge } from '@tramarsa/xplat/utils';
import { environmentBase } from './environment.base';

export const environment = deepMerge(environmentBase, <IEnvironment>{
  production: true,
  endpoint: {
    direccionamiento: '/prod/api/direccionamiento/',
    desglose: '/prod/api/desglose/',
    client: '/prod/api/client/',
    tramarsa: '/prod/api/tramarsa/',
    maestro: '/prod/api/maestro/',
    security: '/prod/api/security/',
    fileblob: '/prod/api/fileblob/',
    sobreestadiacalc: '/prod/api/sobreestadia/calc/',
    sobreestadiaoperaciones: '/prod/api/sobreestadia/operaciones/',
    bancos: '/prod/api/bancos/',
    servicioskn: "/prod/api/servicioskn/",
    emisionbl: "/prod/api/emisionbl/",
    liquidacion: "/prod/api/liquidacion/",
    concesiones: "/prod/api/concesiones/",
    solicitudServicio: "/prod/api/solicitudservicio/",
    cobroslocales:  "/prod/api/cobroslocales/",
    recuperablesok:  "/prod/api/recuperablesok/"
  },
  security: {
    clientId: "pwebtram",
    issuer: "/login"
  }
});
