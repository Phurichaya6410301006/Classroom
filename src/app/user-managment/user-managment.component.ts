import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, UserManage, UserService } from '../service/user-service';

@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {

  user:User ={
    fullName: '',
    email: '',
    password: '',
    _id: ''
  }

  formModel:UserManage = {
    fullName : '',
    email:'',
    password:'',
    listFile:[]
  }

  modeMamage : "EDIT" | "NO_EDIT" = "NO_EDIT";
  fileRender:string | ArrayBuffer | null = '';
  constructor(
    private userService:UserService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    const getItem = sessionStorage.getItem('USERINFO');
    if(getItem){
      this.user = JSON.parse(getItem);
    }
    this.setForm();
  }

  public async changeSelectedFile(event: any) {
    this.formModel.listFile = [];
    const file =event.target.files[0];
    if(file){
      this.formModel.listFile.push(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = (e) => (this.fileRender = reader.result );
      reader.readAsDataURL(file);
    }
}

public clickBrowesFileBtn(): void {
document.getElementById('browseFileAnnonceProfile')?.click();
}

setForm(){
  this.formModel.listFile = [];

  this.userService
  .getUserInfo(this.user._id||'')
  .subscribe({
      next: (res: any) => {
           console.log(res);
           sessionStorage.setItem('USERINFO',JSON.stringify(res.data))
           this.fileRender = res.data.filePath;
           this.formModel.fullName = res.data.fullName;
           this.formModel.email = res.data.email;
           this.formModel.password = res.data.password;
      },
      error: (e) => {
          alert(e.error.msg);
      },
  });

}

onClickBtnManage(){
  let body : UserManage = {
    fullName: this.formModel.fullName,
    email: this.formModel.email,
    password: this.formModel.password,
    listFile: this.formModel.listFile
  }
  this.userService
          .updateUser(body,this.user._id||'')
          .subscribe({
              next: (res: any) => {
                this.setForm()
                alert(res.msg);
                window.location.reload();
              },
              error: (e) => {
                  alert(e.error.msg);
              },
          });
}

}
