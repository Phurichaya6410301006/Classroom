import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoomService } from '../service/class-room.service';
import { User } from '../service/user-service';

@Component({
  selector: 'app-classroom-member',
  templateUrl: './classroom-member.component.html',
  styleUrls: ['./classroom-member.component.css']
})
export class ClassroomMemberComponent {

  announceModalVisible:boolean = false;
  classRoomMember : any;
  dataForDelete : any;
  announceOrWork : "ANNOUNCE" | "WORK" = "ANNOUNCE";
  listUserJoinPerClassroom :any[]=[];

  ownerUser :any;
  listMemberUser :any[]=[];
  listWorkOnly :any[]=[];

  acoutLoginUserId = '';

  userInfo :User | undefined;
  constructor(
    private classRoomService:ClassRoomService,
    private route: ActivatedRoute,
    private router :Router
  ){

  }

  ngOnInit(): void {

    const getItem  = sessionStorage.getItem('USERINFO');
    let userId = '';
    if(getItem){
      const info : User = JSON.parse(getItem);
      this.userInfo = info
      userId = info?._id || '';
    }
    this.acoutLoginUserId = userId;
    console.log(this.route.snapshot);
    this.getListClassRoomAnnounceAndWork();
  }

  getListClassRoomAnnounceAndWork(){

    this.classRoomService
    .getListClassRoomAnnounceAndWork(this.route.snapshot.params['classroomId'])
    .subscribe({
        next: (res: any) => {
          this.classRoomMember = res.data;
          this.listWorkOnly = this.classRoomMember?.listAnnounceAndWork?.filter((item:any)=>item?.announceOrWork == 'WORK' )
          this.classRoomMember?.listAnnounceAndWork?.reverse();
          this.getListClassRoomJoin();
          console.log(this.classRoomMember,this.listWorkOnly);

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
          this.ownerUser = this.listUserJoinPerClassroom.find((userItem:any)=> userItem.userId == this.classRoomMember?.userCreateId);
          this.listMemberUser = this.listUserJoinPerClassroom.filter((userItem:any)=> userItem.userId != this.classRoomMember?.userCreateId);
          console.log(this.listUserJoinPerClassroom,this.ownerUser,this.listMemberUser);
        },
        error: (e) => {
            alert(e.error.msg);
        },
    });
  }


  modeAnnounceModal : "EDIT" | "CREATE" = "EDIT";
  announceOrWorkId:string ='';

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
    this.router.navigate([`/classroommember/${this.route.snapshot.params['classroomId']}/${workId}`])
  }

}

