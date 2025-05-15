import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ProductService extends ApiBaseService {
  constructor(private httpClientService: HttpClientService) {
    super();
    this.endpoint = environment.endpoint.security; // Asegúrate de tener esto en tu environment
  }

  public searchProducts(nombre?: string,   categoria?: string,
  proveedor?: string, startAt?:any, maxResult?:any, progress = false, handlerEnable: boolean | ServerErrorAction = false): Observable<any> {
    const query = new QueryStringBuilder()
      .add('nombre', nombre)
      .add('categoria', categoria)
      .add('proveedor', proveedor)
      .add("startAt", startAt)
      .add("maxResult", maxResult)
      .build();
    const url = this.buildUrl(`Productos/producto${query}`);
    return this.httpClientService.get(url, new HttpParams(), progress, handlerEnable);
  }
}