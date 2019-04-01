import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestOptions,Headers} from "@angular/http";

@Injectable({
  providedIn: 'root'
})



export class ActionApiService {


    baseUrl = 'http://localhost:3000/api/';
    constructor(private http: HttpClient) {}

    private _buildHeaders() {
        let headers = new Headers({
            'content-type': "multipart/form-data",
        });
        let options = new RequestOptions({ headers: headers});
        return options;
    }

    getActions() {
        return this.http.get(this.baseUrl + 'allActions');
    }

    addAction(data){
        return this.http.post(this.baseUrl+'addAction',data);
    }

    updateAction(data){
        return this.http.post(this.baseUrl+'updateAction',data);
    }

    addDetailAction(data){
        return this.http.post(this.baseUrl+'addDetailAction',data);
    }

    getDetailActionList(id_action) {
        return this.http.get(this.baseUrl + 'detailActionList/'+id_action);
    }

    uploadDoc(data){
        let d = new FormData();
        d.append('doc_action', data.doc_action);
        d.append('id_action', data.id_action);
        return this.http.post(this.baseUrl+'upload',d);
    }

    getDocList(id_action){
        return this.http.get(this.baseUrl + 'docsActionList/'+id_action);
    }
}
