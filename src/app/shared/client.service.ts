import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {config} from '../config'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  // using json server and all records are stored in db.json
  getData(){
    return this.http.get<any>(`${config.API_URL}/clients`);
  }

  postData(data: any){
    return this.http.post<any>(`${config.API_URL}/clients`, data);
  }

  deleteData(id: number){
    return this.http.delete<any>(`${config.API_URL}/clients/${id}`);
  }

  getSingleData(id:any){
    return this.http.get<any>(`${config.API_URL}/clients/${id}`);
  }

  updateData(data: any, id:any){
    return this.http.put<any>(`${config.API_URL}/clients/${id}`, data);
  }
}
