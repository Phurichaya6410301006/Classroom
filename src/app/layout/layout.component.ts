import { User } from './../service/user-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  user:User ={
    fullName: '',
    email: '',
    password: '',
    _id: ''
  }
  constructor(
    private router :Router
    ) {}
  ngOnInit(): void {
    const getItem = sessionStorage.getItem('USERINFO');
    if(getItem){
      this.user = JSON.parse(getItem);
    }else {
      this.router.navigate(['/login']);
    }
  }
}
