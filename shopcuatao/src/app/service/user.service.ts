import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/User/register.dto';
import { LoginDTO } from '../dtos/User/login.dto';
import{evironment} from '../enviroment/environment'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiRegister =`${evironment.apiBaseUrl}/users/register`;
  private apiLogin =`${evironment.apiBaseUrl}/users/login`;
  private apiConfig ={headers : this.creatHeaders()}
  constructor(private http: HttpClient) { }
 
   private creatHeaders():HttpHeaders{
    return new HttpHeaders({'Content-Type': 'application/json','Accept-Language':'vi'});
   }
   
  register(registerDTO: RegisterDTO):Observable<any>{
    return this.http.post(this.apiRegister,registerDTO,this.apiConfig)
  }
  
 login(LoginDTO:LoginDTO): Observable<any>{

  return this.http.post(this.apiLogin,LoginDTO,this.apiConfig)
 }
}
  