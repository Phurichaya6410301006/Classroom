import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoomService } from '../service/class-room.service';

@Component({
  selector: 'app-classroom-owner-work',
  templateUrl: './classroom-owner-work.component.html',
  styleUrls: ['./classroom-owner-work.component.css']
})
export class ClassroomOwnerWorkComponent implements OnInit {

  classRoomOwner : any;
  workOwner :any;
  dataForDelete:any;

  ownerUser :any;
  listMemberUser :any[]=[];
  listWorkScoerAllInWork :any[]=[];

  countNotSubmit :number = 0;
  countSubmit :number = 0;
  countCheckSubmit :number = 0;

  announceOrWork : "ANNOUNCE" | "WORK" = "ANNOUNCE";
  modeAnnounceModal : "EDIT" | "CREATE" = "EDIT";
  announceOrWorkId:string ='';
  announceModalVisible:boolean = false;

  constructor(
    private classRoomService:ClassRoomService,
    private route: ActivatedRoute,
    private router:Router
  ){

  }

  ngOnInit(): void {

    console.log(this.route.snapshot.params);
    this.getListClassRoomAnnounceAndWork();

  }

  getListClassRoomAnnounceAndWork(){
    this.classRoomService
    .getListClassRoomAnnounceAndWork(this.route.snapshot.params['classroomId'])
    .subscribe({
        next: (res: any) => {
          this.classRoomOwner = res.data;
          this.workOwner = res.data.listAnnounceAndWork.filter((item:any)=> item?._id == this.route.snapshot.params['workId'])[0];
          this.getWorkScoerAllInWork();
          console.log(this.classRoomOwner,this.workOwner);

        },
        error: (e) => {
            alert(e.error.msg);
        },
    });
  }

  getWorkScoerAllInWork(){
    this.classRoomService
    .getWorkScoerAll(this.route.snapshot.params['workId'])
    .subscribe({
        next: (res: any) => {
          console.log(res.data);
          this.listWorkScoerAllInWork = res.data;
           this.getListAllUserInClassRoom();
        },
        error: (e) => {
            alert(e.error.msg);
        },
    });
  }

  getListAllUserInClassRoom(){
    this.countNotSubmit = 0;
    this.countSubmit = 0;
    this.countCheckSubmit = 0;

    this.classRoomService
    .getListPersonJoin(this.route.snapshot.params['classroomId'])
    .subscribe({
        next: (res: any) => {

          this.ownerUser = res.data.find((userItem:any)=> userItem.userId == this.classRoomOwner?.userCreateId);
          this.listMemberUser = res.data.filter((userItem:any)=> userItem.userId != this.classRoomOwner?.userCreateId);
          this.listMemberUser.forEach(element => {
              element.workScore = this.listWorkScoerAllInWork.find((data:any) => element.userId == data.userId);
          });

          for (const item of this.listMemberUser) {
            if(item.workScore == undefined){
                this.countNotSubmit += 1;
            }else if(item.workScore?.statusWork == 'NOT_SUBMIT' ){
              this.countNotSubmit += 1;
          }else if(item.workScore?.statusWork == 'SUBMIT' ){
                this.countSubmit += 1;
            }else if(item.workScore?.statusWork == 'CHECK_SUBMIT' ){
              this.countCheckSubmit += 1;
          }

          }

          console.log(this.ownerUser,this.listMemberUser);
        },
        error: (e) => {
            alert(e.error.msg);
        },
    });
  }

  openFileNewTab(path:string){
    window.open(path, "_blank")
   }

   showAlertConfirmDeleteFile(data:any){
     this.dataForDelete = data;
     let form  = document.getElementById('alertConfirmDeleteFileId') as HTMLInputElement;
     form.classList.add('show');
   }

   closeAlertConfirmDeleteFile(){
     let form  = document.getElementById('alertConfirmDeleteFileId') as HTMLInputElement;
     form.classList.remove('show');
   }

   confirmDeletlFile(){
     this.classRoomService
     .deleteAnnounceAndWorkDocument( this.dataForDelete._id)
     .subscribe({
         next: (res: any) => {
           this.closeAlertConfirmDeleteFile();
           this.getListClassRoomAnnounceAndWork();
         },
         error: (e) => {
             alert(e.error.msg);
         },
     });
   }

   showAlertConfirmDeleteAnnounce(data:any){
    this.dataForDelete = data;
    let form  = document.getElementById('alertConfirmDeleteAnnounceId') as HTMLInputElement;
    form.classList.add('show');
  }

  closeAlertConfirmDeleteAnnounce(){
    let form  = document.getElementById('alertConfirmDeleteAnnounceId') as HTMLInputElement;
    form.classList.remove('show');
  }

  confirmDeletlAnnounce(){
    this.classRoomService
    .deleteAnnounceOrWork( this.dataForDelete._id)
    .subscribe({
        next: (res: any) => {
          this.router.navigate([`/classroomowner/${this.route.snapshot.params['classroomId']}`])
        },
        error: (e) => {
            alert(e.error.msg);
        },
    });
  }

 backClassroomOwner(){
  this.router.navigate([`/classroomowner/${this.route.snapshot.params['classroomId']}`])
 }

 getNameStatus(workScore:any):string{
  if(workScore == undefined){
    return 'ยังไม่ส่งงาน'
  }else if(workScore?.statusWork == 'NOT_SUBMIT' ){
    return 'ยังไม่ส่งงาน'
  }else if(workScore?.statusWork == 'SUBMIT' ){
     return 'ส่งงานแล้ว'
   }else if(workScore?.statusWork == 'CHECK_SUBMIT' ){
    return 'ตรวจแล้ว'
   }

   return ''
 }

 isNotSubmit(workScore:any) :boolean{
  if(workScore == undefined){
    return true
  }else if(workScore?.statusWork == 'NOT_SUBMIT' ){
    return true
  }
  return false
 }

 isSubmit(workScore:any) :boolean{
  if(workScore == undefined){
    return false
  }else if(workScore?.statusWork == 'SUBMIT' ){
    return true
  }
  return false
 }

 isCheckSubmit(workScore:any) :boolean{
  if(workScore == undefined){
    return false
  }else if(workScore?.statusWork == 'CHECK_SUBMIT' ){
    return true
  }
  return false
 }

 updatescore(workScore:any){
  this.classRoomService
  .updatescore(workScore?._id,workScore.score)
  .subscribe({
      next: (res: any) => {
        this.getListClassRoomAnnounceAndWork();
        alert(res.msg);
      },
      error: (e) => {
          alert(e.error.msg);
      },
  });
}

openAnnounceModal(code : "ANNOUNCE" | "WORK", mode : "EDIT" | "CREATE",params?:any){
  this.announceOrWork = code;
  this.announceModalVisible = true;
  this.modeAnnounceModal = mode;
  if(params){
    this.announceOrWorkId = params._id;
  }

}

}

