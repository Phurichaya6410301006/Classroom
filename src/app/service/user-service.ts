import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export interface User  {
  fullName : string,
  email : string,
  password : string,
  _id? : string
  fileType?: string
  filePath?: string
  fileName?: string
  fileId?: string
}

export interface UserManage  {
  fullName : string,
  email : string,
  password : string,
  listFile : File[]
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(() => error);
}

  createUser(body: User) {
    let url: string = `${environment.api_url}/api/user`;
    return this.http.post(url, body).pipe(catchError(this.formatErrors));
}

 login(email:string,password:string) {
  let url: string = `${environment.api_url}/api/login`;
  return this.http.post(url,{email:email,password:password}).pipe(catchError(this.formatErrors));
}

getUserInfo(userId:string) {
  let url: string = `${environment.api_url}/api/user/${userId}`;
  return this.http.get(url).pipe(catchError(this.formatErrors));
}

updateUser(body: UserManage,userId:string) {

  const formData = new FormData();
     formData.append('fullName', body.fullName);
     formData.append('email', body.email);
     formData.append('password', body.password);

     body.listFile.forEach((element: any) => {
      formData.append('pathFile', element);
     });

  let url: string = `${environment.api_url}/api/user/${userId}`;
  return this.http.put(url, formData).pipe(catchError(this.formatErrors));
}

}
