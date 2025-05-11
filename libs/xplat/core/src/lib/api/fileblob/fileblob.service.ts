import { Injectable } from '@angular/core';
import { HttpClientService } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { map, timestamp } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class FileBlobService extends ApiBaseService {

    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.fileblob;
    }

    private upload(
        file: any,
        app:string, entityName:
        string,
        progress:boolean):Observable<any>{

        const formData = new FormData();
        formData.append("files", file);
        return this.httpClientService.post(this.buildUrl(`file/web/${app}/${entityName}`), formData, {}, progress);
    }

    public uploadFiles(
      files: any,
      app:string,
      entityName:string,
      progress:boolean):Observable<any>{

      const formData = new FormData();

      for (let i = 0; i < files.length; i++){
        formData.append("files", files[i]);
      }

      return this.httpClientService.post(this.buildUrl(`file/web/${app}/${entityName}`), formData, {}, progress);
  }

    public uploadDesglose(file: any, progress:boolean):Observable<any>{
        return this.upload(file, 'des', 'desglose', progress);
    }

    public uploadDirPermanente(file: any, progress:boolean):Observable<any>{
        return this.upload(file, 'dir', 'permanente', progress);
    }

    public uploadRKO(file: any, progress:boolean):Observable<any>{
      return this.upload(file, 'rko', 'recuperableKO', progress);
    }

    public getByUrlArchivoDownload(id:string): string {
        return this.buildUrl(`File/${id}`);
    }

    public deleteFiles(ids:any[]):Observable<any>{
        let param="";
        for (let index = 0; index < ids.length; index++) {
            const id = ids[index];
            param+= "id="+id;
        }
        return this.httpClientService.delete('file/delete?' + param);
    }

    public deleteFile(id:any, progress:boolean):Observable<any>{
      return this.httpClientService.delete(this.buildUrl(`file/${id}`), new HttpParams(), progress);
    }
}
