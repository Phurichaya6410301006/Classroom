import { Component, OnInit, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { ClassRoomModel, ClassRoomService } from 'src/app/service/class-room.service';
import { User } from '../../service/user-service';
declare const bootstrap: any;
@Component({
  selector: 'app-create-class-room',
  templateUrl: './create-class-room.component.html',
  styleUrls: ['./create-class-room.component.css']
})
export class CreateClassRoomComponent implements OnInit {

  @Input() createClassRoomModalVisible :boolean = false;
  @Output() createClassRoomModalVisibleChange = new EventEmitter<boolean>();
  @Output() returnEventCreate = new EventEmitter();
  @Input() mode :'CREATE' | 'EDIT' = 'CREATE';
  @Input() classRoomId :string = '';

  createClassRoomModal :any;
  formModel:ClassRoomModel = {
    nameClassRoom: '',
    classRoomNumber: '',
    descriptionClassRoom: '',
    subject: '',
    userCreateId: '',
    userCreateDate: '',
    userUpdateId: '',
    userUpdateDate: '',
    keyClassRoom: ''
  }

  constructor(
    private classRoomService:ClassRoomService
  ){

  }
  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.createClassRoomModal = new bootstrap.Modal(document.getElementById('createClassRoomModalId'), { backdrop: 'static', keyboard: false });
  }

  onClickBtnSaveClassRoom(){
    if(this.mode == 'EDIT'){
      this.updateClassRoom();
    }else{
      this.createClassRoom();
    }
  }

  createClassRoom(){
    let form  = document.getElementsByClassName('classroom-needs-validation')[0] as HTMLInputElement;
    form.classList.add('was-validated');

    if(!form.checkValidity()){
      alert('กรุณาตรวจสอบความถูกต้อง');
      return;
    }

    const getItem  = sessionStorage.getItem('USERINFO');
    let userId = '';
    if(getItem){
      const userInfo : User = JSON.parse(getItem);
      userId = userInfo?._id || '';
    }

    let body : ClassRoomModel = {
      nameClassRoom: this.formModel.nameClassRoom,
      classRoomNumber: this.formModel.classRoomNumber,
      descriptionClassRoom: this.formModel.descriptionClassRoom,
      subject: this.formModel.subject,
      userCreateId: userId,
      userCreateDate: moment().format(),
      userUpdateId: userId,
      userUpdateDate: moment().format(),
      keyClassRoom: ''
    }

    this.classRoomService
            .createClassRoom(body)
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

  updateClassRoom(){
    let form  = document.getElementsByClassName('classroom-needs-validation')[0] as HTMLInputElement;
    form.classList.add('was-validated');

    if(!form.checkValidity()){
      alert('กรุณาตรวจสอบความถูกต้อง');
      return;
    }

    const getItem  = sessionStorage.getItem('USERINFO');
    let userId = '';
    if(getItem){
      const userInfo : User = JSON.parse(getItem);
      userId = userInfo?._id || '';
    }

    let body : ClassRoomModel = {
      nameClassRoom: this.formModel.nameClassRoom,
      classRoomNumber: this.formModel.classRoomNumber,
      descriptionClassRoom: this.formModel.descriptionClassRoom,
      subject: this.formModel.subject,
      userCreateId: this.formModel.userCreateId,
      userCreateDate: this.formModel.userCreateDate,
      userUpdateId: userId,
      userUpdateDate: moment().format(),
      keyClassRoom: this.formModel.keyClassRoom,
      _id:this.classRoomId
    }

    this.classRoomService
            .updateClassRoom(body)
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

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['createClassRoomModalVisible'].currentValue){
      this.createClassRoomModal.show();

      if(this.mode == 'EDIT'){
        this.classRoomService
        .getClassRoom(this.classRoomId)
        .subscribe({
            next: (res: any) => {
              console.log('DATAEDIT',res.data);
              this.formModel = {
                nameClassRoom: res.data.nameClassRoom,
                classRoomNumber: res.data.classRoomNumber,
                descriptionClassRoom: res.data.descriptionClassRoom,
                subject: res.data.subject,
                userCreateId: res.data.userCreateId,
                userCreateDate: res.data.userCreateDate,
                userUpdateId: res.data.userUpdateId,
                userUpdateDate: res.data.userUpdateDate,
                keyClassRoom: res.data.keyClassRoom
              }
            },
            error: (e) => {
                alert(e.error.msg);
            },
        });

      }else {
        this.formModel = {
        nameClassRoom: '',
        classRoomNumber: '',
        descriptionClassRoom: '',
        subject: '',
        userCreateId: '',
        userCreateDate: '',
        userUpdateId: '',
        userUpdateDate: '',
        keyClassRoom: ''
      }
      }

    }
  }

  closeModal(){
    this.createClassRoomModal.hide();
    this.createClassRoomModalVisible = false;
    this.createClassRoomModalVisibleChange.emit(false);
  }

}

