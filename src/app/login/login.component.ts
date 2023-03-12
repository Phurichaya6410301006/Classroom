import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  formModel = {
    email: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  login() {
    let form = document.getElementsByClassName( 'needs-validation')[0] as HTMLInputElement;
    form.classList.add('was-validated');

    if (!form.checkValidity()) {
      alert('กรุณาตรวจสอบความถูกต้อง');
      return;
    }

    this.userService
      .login(this.formModel.email, this.formModel.password)
      .subscribe({
        next: (res: any) => {

          this.userService
          .getUserInfo(res.data._id||'')
          .subscribe({
              next: (dataUser: any) => {
                sessionStorage.setItem('USERINFO', JSON.stringify(dataUser.data));
                this.router.navigate(['/classroom']);},
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
