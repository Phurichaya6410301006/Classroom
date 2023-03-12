import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { AnnounceAndWorkModel, ClassRoomService } from 'src/app/service/class-room.service';
import { User } from './../../service/user-service';
declare const bootstrap: any;

@Component({
  selector: 'app-announce-manage',
  templateUrl: './announce-manage.component.html',
  styleUrls: ['./announce-manage.component.css']
})
export class AnnounceManageComponent implements OnInit {

  @Input() announceModalVisible :boolean = false;
  @Output() announceModalVisibleChange = new EventEmitter<boolean>();
  @Output() returnEventCreate = new EventEmitter();
  @Input() announceOrWork : "ANNOUNCE" | "WORK" = "ANNOUNCE";
  @Input() mode : "EDIT" | "CREATE" = "EDIT";
  @Input() announceOrWorkId : string = '';
  announceModal :any;

  user:User ={
    fullName: '',
    email: '',
    password: '',
    _id: ''
  }


  formModel : AnnounceAndWorkModel = {
    classRoomId: '',
    description: '',
    subject: '',
    userCreateId: '',
    userCreateDate: '',
    userUpdateId: '',
    userUpdateDate: '',
    announceOrWork: 'ANNOUNCE',
    listFile: []
  }

  constructor(
    private classRoomService:ClassRoomService,
    private route: ActivatedRoute
  ){

  }

  ngAfterViewInit(): void {
    this.announceModal = new bootstrap.Modal(document.getElementById('joinClassModalId'), { backdrop: 'static', keyboard: false });
  }

  ngOnInit(): void {
    const getItem = sessionStorage.getItem('USERINFO');
    if(getItem){
      this.user = JSON.parse(getItem);
    }

    console.log(this.route.snapshot);

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['announceModalVisible'].currentValue){
      this.announceModal.show();
      if(this.mode == 'CREATE'){
         this.formModel  = {
        classRoomId: '',
        description: '',
        subject: '',
        userCreateId: '',
        userCreateDate: '',
        userUpdateId: '',
        userUpdateDate: '',
        announceOrWork: this.announceOrWork,
        listFile: []
       }
      }else{
        this.classRoomService
        .getAnnounceandWork(this.announceOrWorkId)
        .subscribe({
            next: (res: any) => {
              console.log('DATAEDIT',res.data);
              this.formModel = {
                classRoomId: res.data.classRoomId,
                description: res.data.description,
                subject: res.data.subject,
                userCreateId: res.data.userCreateId,
                userCreateDate: res.data.userCreateDate,
                userUpdateId: res.data.userUpdateId,
                userUpdateDate: res.data.userUpdateDate,
                announceOrWork: this.announceOrWork,
                listFile: []
              }
            },
            error: (e) => {
                alert(e.error.msg);
            },
        });
      }

      let form  = document.getElementsByClassName('announce-needs-validation')[0] as HTMLInputElement;
      form.classList.remove('was-validated');

    }
  }

  closeModal(){
    this.announceModal.hide();
    this.announceModalVisible = false;
    this.announceModalVisibleChange.emit(false);
  }

  onClickBtnSaveClassRoomDocument() {
    if(this.mode == 'CREATE'){
      this.createClassRoomDocument()
    }else{
      this.updateClassRoomDocument();
    }

  }
  createClassRoomDocument(){
    let form  = document.getElementsByClassName('announce-needs-validation')[0] as HTMLInputElement;
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

this.formModel
    this.classRoomService
            .createClassRoomDocument({
              classRoomId: this.route.snapshot.params['classroomId'],
              description: this.formModel.description,
              subject: this.formModel.subject,
              userCreateId: userId,
              userCreateDate: moment().format(),
              userUpdateId: userId,
              userUpdateDate: moment().format(),
              announceOrWork: this.announceOrWork,
              listFile: this.formModel.listFile
            })
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

  updateClassRoomDocument(){
    let form  = document.getElementsByClassName('announce-needs-validation')[0] as HTMLInputElement;
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

this.formModel
    this.classRoomService
            .updatrClassRoomDocument({
              classRoomId: this.route.snapshot.params['classroomId'],
              description: this.formModel.description,
              subject: this.formModel.subject,
              userCreateId: this.formModel.userCreateId,
              userCreateDate: this.formModel.userCreateDate,
              userUpdateId: userId,
              userUpdateDate: moment().format(),
              announceOrWork: this.announceOrWork,
              listFile: this.formModel.listFile,
              _id:this.announceOrWorkId
            })
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

public async changeSelectedFile(event: any) {
        if(event.target.files[0]){
          this.formModel.listFile.push(event.target.files[0]);
        }
}

public clickBrowesFileBtn(): void {
  document.getElementById('browseFileAnnonce')?.click();
}

deleteFile(rowIndex:number){
  this.formModel.listFile.splice(rowIndex,1);
}


}


