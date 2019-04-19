import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RequestOptions, Headers} from '@angular/http';

@Injectable({
    providedIn: 'root',
})


export class ActionApiService {

    baseUrl = 'http://localhost:3000/api/';

    constructor(private http: HttpClient) {
    }

    private _buildHeaders() {
        const headers = new Headers({
            'content-type': 'multipart/form-data',
        });
        const options = new RequestOptions({headers: headers});
        return options;
    }

    getActions() {
        return this.http.get(this.baseUrl + 'allActions');
    }

    addAction(data) {
        return this.http.post(this.baseUrl + 'addAction', data);
    }

    updateAction(data) {
        return this.http.post(this.baseUrl + 'updateAction', data);
    }

    deleteActions(ids){
        return this.http.post(this.baseUrl + 'deleteActions', ids);
    }

    addDetailAction(data) {
        return this.http.post(this.baseUrl + 'addDetailAction', data);
    }

    getDetailActionList(id_action) {
        return this.http.get(this.baseUrl + 'detailActionList/' + id_action);
    }

    uploadDoc(data) {
        const d = new FormData();
        d.append('doc_action', data.doc_action);
        d.append('id_action', data.id_action);
        d.append('path', data.path);
        return this.http.post(this.baseUrl + 'upload', d);
    }

    getDocList(id_action) {
        return this.http.get(this.baseUrl + 'docsActionList/' + id_action);
    }

    deleteDocs(ids){
        return this.http.post(this.baseUrl + 'deleteDocs', ids);
    }

    deleteDetailsAction(ids){
        return this.http.post(this.baseUrl + 'deleteDetailsAction', ids);
    }

    updateDetailAction(data) {
        return this.http.post(this.baseUrl + 'updateDetailAction', data);
    }
}
