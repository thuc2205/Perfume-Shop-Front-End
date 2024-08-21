import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{evironment} from '../enviroment/environment'
@Injectable({
    providedIn: 'root'
  })
  export class RoleService {
    private apiGetRole = `${evironment.apiBaseUrl}/roles`;
    constructor(private http: HttpClient) { }
    getRole(): Observable<any[]> {
      return this.http.get<any[]>(this.apiGetRole);
    }
  }