import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService,User } from '../service/user-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService: UserService,
    private router :Router) {}

  formModel = {
    name : '',
    email:'',
    password:'',
    confirmPassword : ''
  }

  createUser(){
    let form  = document.getElementsByClassName('needs-validation')[0] as HTMLInputElement;
    form.classList.add('was-validated');

    if(!form.checkValidity()){
      alert('กรุณาตรวจสอบความถูกต้อง');
      return;
    }

    if(this.formModel.password != this.formModel.confirmPassword){
      alert('รหัสผ่านไม่ตรงกัน');
      return;
    }

    let body : User = {
      fullName : this.formModel.name,
      email : this.formModel.email,
      password : this.formModel.password
    }
    this.userService
            .createUser(body)
            .subscribe({
                next: (res: any) => {
                  this.userService
                  .getUserInfo(res.data._id||'')
                  .subscribe({
                      next: (dataUser: any) => {
                        sessionStorage.setItem('USERINFO',JSON.stringify(dataUser.data))
                        alert(res.msg);
                        this.router.navigate(['/classroom'])
                      },
                      error: (e) => {
                          alert(e.error.msg);
                      },
                  });

                },
                error: (e) => {
                    alert(e.error.msg);
                },
            });
  }
}
