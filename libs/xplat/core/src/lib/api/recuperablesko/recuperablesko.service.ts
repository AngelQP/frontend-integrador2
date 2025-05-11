import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '@tramarsa/xplat/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ApiBaseService } from '../api.base.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class RecuperablesOkService extends ApiBaseService {

    constructor(private httpClientService: HttpClientService)
    {
      super();
      this.endpoint = environment.endpoint.recuperablesok;
    }

    public estadosFacturado(){
      return [
        {estadoFacturadoCodigo:"1", estadoFacturadoNombre:"Pendiente"},
        {estadoFacturadoCodigo:"2", estadoFacturadoNombre:"Facturado"}
      ]
    }
    public estadosPagado(){
      return [
        {estadoPagoCodigo:"1", estadoPagoNombre:"Pendiente"},
        {estadoPagoCodigo:"2", estadoPagoNombre:"Pagado"}
      ]
    }

    public search(codigoSociedad:any,
      codigoNegocio:any,
      codigoSucursal:any,
      recalada:any,
      desde:any,
      hasta:any,
      facturado:any,
      pagado:any,
      startAt:any, maxResult:any,
      progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>
    {
      const query = new QueryStringBuilder()
        .add("codigoSociedad", codigoSociedad)
        .add("codigoNegocio", codigoNegocio)
        .add("codigoSucursal", codigoSucursal)
        .add("recalada", recalada)
        .addDate("desde",desde)
        .addDate("hasta", hasta)
        .add("facturado", facturado)
        .add("pagado", pagado)
        .add("startAt", startAt)
        .add("maxResult", maxResult)
        .build();

        const url = this.buildUrl(`RecuperablesKO/solicitudes${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }
    public download(codigoSociedad:any,
      codigoNegocio:any,
      codigoSucursal:any,
      recalada:any,
      desde:any,
      hasta:any,
      facturado:any,
      pagado:any,
      progress:boolean=false):Observable<any>{

        const query = new QueryStringBuilder()
        .add("codigoSociedad", codigoSociedad)
        .add("codigoNegocio", codigoNegocio)
        .add("codigoSucursal", codigoSucursal)
        .add("recalada", recalada)
        .addDate("desde",desde)
        .addDate("hasta", hasta)
        .add("facturado", facturado)
        .add("pagado", pagado)
        .build();

        const url = this.buildUrl(`RecuperablesKO/solicitudes/exportar${query}`)
        return this.httpClientService
        .getBlob(url, progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "recuperablesKO.xlsx"
            }
        }))
    }

    public CreateSolicitudRecuperable(payload: any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
      return this
            .httpClientService
            .post(this.buildUrl(`recuperablesKO/solicitud`), payload, {}, progress, handlerEnable)
    }

    public ModifiedSolicitudRecuperable(payload: any, id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
      const u= this.buildUrl(`recuperablesKO/solicitud/${id}`)
      return this
            .httpClientService
            .put(u, payload, progress, handlerEnable);
    }
    public get(id:any,
      progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        const url = this.buildUrl(`recuperablesKO/solicitud/${id}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }
    public getServicio(id:any,
      progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        const url = this.buildUrl(`recuperablesKO/solicitud/servicio/${id}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }
    public modifiedServicio(payload: any, id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
      const u= this.buildUrl(`recuperablesKO/solicitud/servicio/${id}`)
      return this
            .httpClientService
            .put(u, payload, progress, handlerEnable);
    }
    public addServicioDocument(id:any, payload:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
      const u= this.buildUrl(`recuperablesKO/solicitud/servicio/${id}/archivo`)
      return this
            .httpClientService
            .post(u, payload, {}, progress, handlerEnable)

    }

    public deleteServicioDocument(id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
      const u= this.buildUrl(`recuperablesKO/solicitud/servicio/archivo/${id}`)
      return this
            .httpClientService
            .delete(u, new HttpParams(), progress, handlerEnable);
    }

    public modifiedServicioReferencia(id:any, refPayload:any,  progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
      const u= this.buildUrl(`recuperablesKO/solicitud/servicio/${id}`)
      return this
            .httpClientService
            .put(u, refPayload, progress, handlerEnable);
    }

    public getServiciosByDefault(codigoSociedad:any,
      codigoNegocio:any,
      codigoSucursal:any,

      progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>
    {
      const query = new QueryStringBuilder()
        .add("codigoSociedad", codigoSociedad)
        .add("codigoNegocio", codigoNegocio)
        .add("codigoSucursal", codigoSucursal)
        .build();

        const url = this.buildUrl(`recuperablesKO/servicios/por-defecto${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }

    public getTiposServicios(codigoSociedad:any,
      codigoNegocio:any,
      nombre:any,

      progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>
    {
      const query = new QueryStringBuilder()
        .add("codigoSociedad", codigoSociedad)
        .add("codigoNegocio", codigoNegocio)
        .add("nombre", nombre)
        .build();

        const url = this.buildUrl(`recuperablesKO/servicio${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }

    public getCondicionesPago(codigoSociedad:any,
      codigoNegocio:any,
      codigoCliente:any,

      progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>
    {
      const query = new QueryStringBuilder()
        .add("codigoSociedad", codigoSociedad)
        .add("codigoNegocio", codigoNegocio)
        .add("codigoCliente", codigoCliente)
        .build();

        const url = this.buildUrl(`recuperablesKO/condicionPago${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }



    public getTarifaSucursal(codigoSociedad:any,
      codigoNegocio:any,
      codigoSucursal:any,
      codigoServicio:any,
      nombre:any,

      progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>
    {
      const query = new QueryStringBuilder()
        .add("codigoSociedad", codigoSociedad)
        .add("codigoNegocio", codigoNegocio)
        .add("codigoSucursal", codigoSucursal)
        .add("codigoServicio", codigoServicio)
        .add("nombre", nombre)
        .build();

        const url = this.buildUrl(`recuperablesKO/tarifaSucursal${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }

    public getPreComprobante(id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
      const url = this.buildUrl(`recuperablesKO/solicitud/preComprobante/${id}`)
      return this
              .httpClientService
              .get(url, new HttpParams(), progress, handlerEnable)
    }
    public getDataPreComprobante(id:any, payload:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
      const u= this.buildUrl(`recuperablesKO/solicitud/${id}/preComprobante`)
      return this
            .httpClientService
            .post(u, payload, {}, progress, handlerEnable)
    }
    public GeneratePreComprobante(payload:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
      const u= this.buildUrl(`recuperablesKO/solicitud/preComprobante`)
      return this
            .httpClientService
            .post(u, payload, {}, progress, handlerEnable)

    }
    public GenerarKO(payload:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
      const u= this.buildUrl(`recuperablesKO/ko`)
      return this
            .httpClientService
            .post(u, payload, {}, progress, handlerEnable)
    }

    public GenerarAnticipo(payload:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
      const u= this.buildUrl(`recuperablesKO/anticipo`)
      return this
            .httpClientService
            .post(u, payload, {}, progress, handlerEnable)
    }

    public downloadArchivoCobranza(idComprobante:any,
      progress:boolean=false):Observable<any>{

        const query = new QueryStringBuilder()
        .add("comprobanteId", idComprobante)
        .build();

        const url = this.buildUrl(`RecuperablesKO/archivoCobranza${query}`)
        return this.httpClientService
        .getBlob(url, progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: `archivoCobranza_${idComprobante}.pdf`
            }
        }))
    }

    public getArchivoSE(codigoSociedad:any, documentoFI_SE:any,
      progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>
    {
      const query = new QueryStringBuilder()
        .add("codigoSociedad", codigoSociedad)
        .add("documentoFI_SE", documentoFI_SE)
        .build();

        const url = this.buildUrl(`recuperablesKO/archivoSE${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }
}
