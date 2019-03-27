import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActionApiService {

    baseUrl = 'http://localhost:3000/api/';
    constructor(private http: HttpClient) {}

    getActions() {
        return this.http.get(this.baseUrl + 'allActions');
    }

    addAction(data){
        return this.http.post(this.baseUrl+'addAction',data);
    }
}
