import { Router } from '@angular/router';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ClassRoomService } from '../service/class-room.service';
import { User } from '../service/user-service';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit{
  listClassRoom :any[] = [];
  // joinClassModal:any;
  createClassRoomModalVisible :boolean =false;
  joinClassModalVisible :boolean =false;
  acoutLoginUserId = '';
  constructor(
    private classRoomService :ClassRoomService,
    private router:Router
    ) {
       const getItem  = sessionStorage.getItem('USERINFO');
    let userId = '';
    if(getItem){
      const userInfo : User = JSON.parse(getItem);
      userId = userInfo?._id || '';
    }
    this.acoutLoginUserId = userId;}

  ngOnInit(): void {
    this.getListClassRoomJoin();
  }

  getListClassRoomJoin(){
    this.classRoomService
    .getListClassRoomJoin()
    .subscribe({
        next: (res: any) => {
          this.listClassRoom = res.data;
        },
        error: (e) => {
            alert(e.error.msg);
        },
    });
  }

  openModalJoinClass(){
    this.joinClassModalVisible = true;
  }

  openModalCreateClassRoom(){
    this.createClassRoomModalVisible = true;
  }

  goToClassRoomManage(item:any){
    console.log(item);
    if(this.acoutLoginUserId == item.classroom.userCreateId){
      this.router.navigate([`/classroomowner/${item.classRoomId}`]);
    }else{
      this.router.navigate([`/classroommember/${item.classRoomId}`]);
    }
    // this.router.navigate([''])
  }
}


