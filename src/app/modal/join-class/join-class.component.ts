import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ClassRoomService } from 'src/app/service/class-room.service';
import { User } from './../../service/user-service';
declare const bootstrap: any;

@Component({
  selector: 'app-join-class',
  templateUrl: './join-class.component.html',
  styleUrls: ['./join-class.component.css']
})
export class JoinClassComponent implements OnInit{

  @Input() joinClassModalVisible :boolean = false;
  @Output() joinClassModalVisibleChange = new EventEmitter<boolean>();
  @Output() returnEventCreate = new EventEmitter();

  joinClassModal :any;

  user:User ={
    fullName: '',
    email: '',
    password: '',
    _id: ''
  }

  joinClassCode = '';

  constructor(
    private classRoomService:ClassRoomService
  ){

  }

  ngAfterViewInit(): void {
    this.joinClassModal = new bootstrap.Modal(document.getElementById('joinClassModalId'), { backdrop: 'static', keyboard: false });

  }

  ngOnInit(): void {
    const getItem = sessionStorage.getItem('USERINFO');
    if(getItem){
      this.user = JSON.parse(getItem);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['joinClassModalVisible'].currentValue){
      this.joinClassModal.show();
      this.joinClassCode = '';
    }
  }

  closeModal(){
    this.joinClassModal.hide();
    this.joinClassModalVisible = false;
    this.joinClassModalVisibleChange.emit(false);
  }

  createJoinClassRoomByKey(){
    let form  = document.getElementsByClassName('joinclassroom-needs-validation')[0] as HTMLInputElement;
    form.classList.add('was-validated');

    if(!form.checkValidity()){
      alert('กรุณาตรวจสอบความถูกต้อง');
      return;
    }

    this.classRoomService
            .joinClassRoomByKey(this.joinClassCode)
            .subscribe({
                next: (res: any) => {
                  this.returnEventCreate.emit();
                  alert(res.msg);
                  this.closeModal();
                },
                error: (e) => {
                    alert(e.error.msg);
                },
            });
  }

}

