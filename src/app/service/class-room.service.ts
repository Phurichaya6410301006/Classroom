import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { User } from './user-service';
export interface ClassRoomModel  {
  nameClassRoom : string,
  classRoomNumber : string,
  descriptionClassRoom: string,
  subject: string,
  userCreateId: string,
  userCreateDate: string,
  userUpdateId: string,
  userUpdateDate: string,
  keyClassRoom: string,
  _id? : string
}

export interface AnnounceAndWorkModel  {
  classRoomId: string,
  description: string,
  subject: string,
  userCreateId: string,
  userCreateDate: string,
  userUpdateId: string,
  userUpdateDate: string,
  announceOrWork: 'ANNOUNCE' | 'WORK',
  listFile : File[]
  _id? : string
}

export interface AnnounceAndWorkDocumentModel  {
  fileName: string,
  filePath: string,
  fileType:string ,
  classRoomId: string,
  announceAndWorkId: string
  _id? : string
}

@Injectable({
  providedIn: 'root'
})
export class ClassRoomService {

  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(() => error);
}

  createClassRoom(body: ClassRoomModel) {
    let url: string = `${environment.api_url}/api/classroom`;
    return this.http.post(url, body).pipe(catchError(this.formatErrors));
 }

 getListClassRoomJoin() {

  const getItem  = sessionStorage.getItem('USERINFO');
  let userId = '';
  if(getItem){
    const userInfo : User = JSON.parse(getItem);
    userId = userInfo?._id || '';
  }

  let url: string = `${environment.api_url}/api/classroom/join/classroom`;
  return this.http.get(url, {params:{userId:userId}}).pipe(catchError(this.formatErrors));
}

joinClassRoomByKey(key:string) {

  const getItem  = sessionStorage.getItem('USERINFO');
  let userId = '';
  if(getItem){
    const userInfo : User = JSON.parse(getItem);
    userId = userInfo?._id || '';
  }

  let url: string = `${environment.api_url}/api/classroom/join/${key}`;
  return this.http.post(url, {userId:userId}).pipe(catchError(this.formatErrors));
}

createClassRoomDocument(body: AnnounceAndWorkModel) {

  const formData = new FormData();
     formData.append('classRoomId', body.classRoomId);
     formData.append('description', body.description);
     formData.append('subject', body.subject);
     formData.append('userCreateId', body.userCreateId);
     formData.append('userCreateDate', body.userCreateDate);
     formData.append('userUpdateId', body.userUpdateId);
     formData.append('userUpdateDate', body.userUpdateDate);
     formData.append('announceOrWork', body.announceOrWork);

     body.listFile.forEach((element: any) => {
      formData.append('pathFile', element);
     });

  let url: string = `${environment.api_url}/api/classroom/document`;
  return this.http.post(url, formData).pipe(catchError(this.formatErrors));
}

updatrClassRoomDocument(body: AnnounceAndWorkModel) {

  const formData = new FormData();
     formData.append('_id', body._id || '');
     formData.append('classRoomId', body.classRoomId);
     formData.append('description', body.description);
     formData.append('subject', body.subject);
     formData.append('userCreateId', body.userCreateId);
     formData.append('userCreateDate', body.userCreateDate);
     formData.append('userUpdateId', body.userUpdateId);
     formData.append('userUpdateDate', body.userUpdateDate);
     formData.append('announceOrWork', body.announceOrWork);

     body.listFile.forEach((element: any) => {
      formData.append('pathFile', element);
     });

  let url: string = `${environment.api_url}/api/classroom/document/${body._id}`;
  return this.http.put(url, formData).pipe(catchError(this.formatErrors));
}

getListClassRoomAnnounceAndWork(classRoomId:string) {
  let url: string = `${environment.api_url}/api/classroom/document/${classRoomId}`;
  return this.http.get(url).pipe(catchError(this.formatErrors));
}

deleteAnnounceAndWorkDocument(announceAndWorkDocumentId:string) {
  let url: string = `${environment.api_url}/api/classroom/document/${announceAndWorkDocumentId}`;
  return this.http.delete(url).pipe(catchError(this.formatErrors));
}

deleteAnnounceOrWork(announceAndWorkId:string) {
  let url: string = `${environment.api_url}/api/classroom/announceandWork/${announceAndWorkId}`;
  return this.http.delete(url).pipe(catchError(this.formatErrors));
}

getListPersonJoin(classRoomId:string) {
  let url: string = `${environment.api_url}/api/classroom/join/person`;
  return this.http.get(url, {params:{classRoomId:classRoomId}}).pipe(catchError(this.formatErrors));
}

createWorkScoerDocument(listFile:File[],workId:string,userId:string) {
  const formData = new FormData();
     listFile.forEach((element: any) => {
      formData.append('pathFile', element);
     });
  let url: string = `${environment.api_url}/api/workscore/${workId}/${userId}`;
  return this.http.post(url, formData).pipe(catchError(this.formatErrors));
}

getWorkScoerDocument(workId:string,userId:string) {
  let url: string = `${environment.api_url}/api/workscore/${workId}/${userId}`;
  return this.http.get(url).pipe(catchError(this.formatErrors));
}

deleteWorkScoerDocument(documentId:string) {
  let url: string = `${environment.api_url}/api/workscore/${documentId}`;
  return this.http.delete(url).pipe(catchError(this.formatErrors));
}

getWorkScoerAll(workId:string) {
  let url: string = `${environment.api_url}/api/workscore/${workId}`;
  return this.http.get(url).pipe(catchError(this.formatErrors));
}

updatescore(workscoreId:string,score:number) {
  let url: string = `${environment.api_url}/api/workscore/updatescore/${workscoreId}`;
  return this.http.put(url,{score:score}).pipe(catchError(this.formatErrors));
}

deleteClassRoom(classRoomId:string) {
  let url: string = `${environment.api_url}/api/classroom/${classRoomId}`;
  return this.http.delete(url).pipe(catchError(this.formatErrors));
}

getClassRoom(classRoomId:string) {
  let url: string = `${environment.api_url}/api/classroom/${classRoomId}`;
  return this.http.get(url).pipe(catchError(this.formatErrors));
}

updateClassRoom(body: ClassRoomModel) {
  let url: string = `${environment.api_url}/api/classroom/${body._id}`;
  return this.http.put(url, body).pipe(catchError(this.formatErrors));
}

getAnnounceandWork(announceAndWorkId:string) {
  let url: string = `${environment.api_url}/api/classroom/announceandWork/${announceAndWorkId}`;
  return this.http.get(url).pipe(catchError(this.formatErrors));
}

}
