import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ClassRoomService } from '../service/class-room.service';
import { User } from './../service/user-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input()  user:User ={
    fullName: '',
    email: '',
    password: '',
    _id: ''
  }

  listClassRoomMember :any[] = [];
  listClassRoomOwner :any[] = [];

   constructor(
    private router :Router,
    private classRoomService :ClassRoomService
    ) {}

    ngOnInit(): void {
      this.getListClassRoomJoin();
    }

  getListClassRoomJoin(){
    this.classRoomService
    .getListClassRoomJoin()
    .subscribe({
        next: (res: any) => {
          this.listClassRoomMember = res.data.filter((room:any) => room.classroom?.userCreateId != this.user._id);
          this.listClassRoomOwner = res.data.filter((room:any) => room.classroom?.userCreateId == this.user._id);
        },
        error: (e) => {
            alert(e.error.msg);
        },
    });
  }


  logOut(){
    sessionStorage.removeItem('USERINFO');
    this.router.navigate(['/login']);
  }

  usermanagment(){
    this.router.navigate(['/usermanagment']);
  }

  async goToClassroomowner(item:any){
    await this.router.navigate([`/classroomowner`]);
    this.router.navigate([`/classroomowner/${item?.classroom?._id}`]);
  }

  async goToClassroomember(item:any){
    await this.router.navigate([`/classroomowner`]);
    this.router.navigate([`/classroommember/${item?.classroom?._id}`]);
  }

  goToClassroom(){
    this.router.navigate([`/classroom`]);
  }

}
