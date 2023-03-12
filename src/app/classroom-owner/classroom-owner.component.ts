import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoomService } from '../service/class-room.service';
import { User } from '../service/user-service';

@Component({
  selector: 'app-classroom-owner',
  templateUrl: './classroom-owner.component.html',
  styleUrls: ['./classroom-owner.component.css']
})
export class ClassroomOwnerComponent implements OnInit {

  announceModalVisible:boolean = false;
  classRoomOwner : any;
  dataForDelete : any;
  announceOrWork : "ANNOUNCE" | "WORK" = "ANNOUNCE";
  listUserJoinPerClassroom :any[]=[];

  ownerUser :any;
  listMemberUser :any[]=[];
  listWorkOnly :any[]=[];

  createClassRoomModalVisible:boolean =false;

  classRoomId : string= '';

  modeAnnounceModal : "EDIT" | "CREATE" = "EDIT";
  announceOrWorkId:string ='';

  userInfo :User | undefined;
  constructor(
    private classRoomService:ClassRoomService,
    private route: ActivatedRoute,
    private router :Router
  ){

  }

  ngOnInit(): void {
    const getItem  = sessionStorage.getItem('USERINFO');
    if(getItem){
      this.userInfo = JSON.parse(getItem);
    }
    console.log(this.route.snapshot);
    this.classRoomId = this.route.snapshot.params['classroomId'];
    this.getListClassRoomAnnounceAndWork();
  }

  getListClassRoomAnnounceAndWork(){

    this.classRoomService
    .getListClassRoomAnnounceAndWork(this.route.snapshot.params['classroomId'])
    .subscribe({
        next: (res: any) => {
          this.classRoomOwner = res.data;
          this.listWorkOnly = this.classRoomOwner?.listAnnounceAndWork?.filter((item:any)=>item?.announceOrWork == 'WORK' )
          this.classRoomOwner?.listAnnounceAndWork?.reverse();
          this.getListClassRoomJoin();
          console.log(this.classRoomOwner,this.listWorkOnly);

        },
        error: (e) => {
            alert(e.error.msg);
        },
    });
  }

  getListClassRoomJoin(){
    this.classRoomService
    .getListPersonJoin(this.route.snapshot.params['classroomId'])
    .subscribe({
        next: (res: any) => {
          this.listUserJoinPerClassroom = res.data;
          this.ownerUser = this.listUserJoinPerClassroom.find((userItem:any)=> userItem.userId == this.classRoomOwner?.userCreateId);
          this.listMemberUser = this.listUserJoinPerClassroom.filter((userItem:any)=> userItem.userId != this.classRoomOwner?.userCreateId);
          console.log(this.listUserJoinPerClassroom,this.ownerUser,this.listMemberUser);
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
          this.closeAlertConfirmDeleteAnnounce();
          this.getListClassRoomAnnounceAndWork();
        },
        error: (e) => {
            alert(e.error.msg);
        },
    });
  }

  gotoPageManageWork(workId:string){
    this.router.navigate([`/classroomowner/${this.route.snapshot.params['classroomId']}/${workId}`])
  }

  getScore(userId:string, workScoer:any[]):number{
      const findScore = workScoer.filter((data:any)=> data.userId == userId);
      if(findScore.length > 0){
        return findScore[0].score
      }
      return 0;
  }

  getScoreSum(userId:string){
    let count = 0;
    for (const work of this.listWorkOnly) {
      if(this.listWorkOnly){
        const findScore = work.workScoer.filter((data:any)=> data.userId == userId);
      if(findScore.length > 0){
        if(findScore[0].score != null){
          count +=findScore[0].score;
        }

      }
      }

    }
    return count;
  }

  showAlertConfirmDeleteClassRoom(data:any){
    this.dataForDelete = data;
    let form  = document.getElementById('alertConfirmDeleteClassRoomId') as HTMLInputElement;
    form.classList.add('show');
  }

  closeAlertConfirmDeleteClassRoom(){
    let form  = document.getElementById('alertConfirmDeleteClassRoomId') as HTMLInputElement;
    form.classList.remove('show');
  }

  confirmDeletlClassRoom(){
    this.classRoomService
    .deleteClassRoom( this.route.snapshot.params['classroomId'])
    .subscribe({
        next: (res: any) => {
          alert(res.msg);
          this.router.navigate([`/classroom`]);
        },
        error: (e) => {
            alert(e.error.msg);
        },
    });
  }

  openModalEditClassRoom(){
    this.createClassRoomModalVisible = true;
  }
}
