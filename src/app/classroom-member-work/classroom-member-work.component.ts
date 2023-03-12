import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassRoomService } from '../service/class-room.service';
import { User } from '../service/user-service';

@Component({
  selector: 'app-classroom-member-work',
  templateUrl: './classroom-member-work.component.html',
  styleUrls: ['./classroom-member-work.component.css']
})
export class ClassroomMemberWorkComponent {

  classRoomMember : any;
  workMember :any;
  dataForDelete:any;

  listFile : File[] =[];
  workScoerDocument:any;

  constructor(
    private classRoomService:ClassRoomService,
    private route: ActivatedRoute,
    private router:Router
  ){

  }

  ngOnInit(): void {

    console.log(this.route.snapshot.params);
    this.getListClassRoomAnnounceAndWork();
    this.getWorkScoerDocument();
  }

  getWorkScoerDocument(){
    const getItem  = sessionStorage.getItem('USERINFO');
    let userId = '';
    if(getItem){
      const userInfo : User = JSON.parse(getItem);
      userId = userInfo?._id || '';
    }

    this.classRoomService
    .getWorkScoerDocument(this.route.snapshot.params['workId'],userId)
    .subscribe({
        next: (res: any) => {
          this.workScoerDocument = res.data;
          console.log(this.workScoerDocument);

        },
        error: (e) => {
            alert(e.error.msg);
        },
    });
  }

  getListClassRoomAnnounceAndWork(){
    this.classRoomService
    .getListClassRoomAnnounceAndWork(this.route.snapshot.params['classroomId'])
    .subscribe({
        next: (res: any) => {
          this.classRoomMember = res.data;
          this.workMember = res.data.listAnnounceAndWork.filter((item:any)=> item?._id == this.route.snapshot.params['workId'])[0];
        },
        error: (e) => {
            alert(e.error.msg);
        },
    });
  }

  backClassroomOwner(){
    this.router.navigate([`/classroommember/${this.route.snapshot.params['classroomId']}`])
   }

   openFileNewTab(path:string){
    window.open(path, "_blank")
   }

   public async changeSelectedFile(event: any) {
    if(event.target.files[0]){
      this.listFile.push(event.target.files[0]);
    }
}

public clickBrowesFileBtn(): void {
document.getElementById('browseFileAnnonce')?.click();
}

deleteFile(rowIndex:number){
this.listFile.splice(rowIndex,1);
}

createClassRoomDocument(){

  if(this.listFile.length == 0){
    alert('กรุณาเพิ่มไฟล์อย่างน้อย 1 ไฟล์');
    return;
  }

  const getItem  = sessionStorage.getItem('USERINFO');
  let userId = '';
  if(getItem){
    const userInfo : User = JSON.parse(getItem);
    userId = userInfo?._id || '';
  }

  this.classRoomService.createWorkScoerDocument(this.listFile,this.route.snapshot.params['workId'],userId)
          .subscribe({
              next: (res: any) => {
                this.listFile = [];
                this.getListClassRoomAnnounceAndWork();
                this.getWorkScoerDocument();
                alert(res.msg);
              },
              error: (e) => {
                  alert(e.error.msg);
              },
  });
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
  .deleteWorkScoerDocument( this.dataForDelete._id)
  .subscribe({
      next: (res: any) => {
        this.closeAlertConfirmDeleteFile();
        this.getListClassRoomAnnounceAndWork();
        this.getWorkScoerDocument();
      },
      error: (e) => {
          alert(e.error.msg);
      },
  });
}

}
