import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.components';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.components';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClassroomComponent } from './classroom/classroom.component';
import { JoinClassComponent } from './modal/join-class/join-class.component';
import { CreateClassRoomComponent } from './modal/create-class-room/create-class-room.component';
import { ClassroomMemberComponent } from './classroom-member/classroom-member.component';
import { ClassroomOwnerComponent } from './classroom-owner/classroom-owner.component';
import { AnnounceManageComponent } from './modal/announce-manage/announce-manage.component';
import { ClassroomMemberWorkComponent } from './classroom-member-work/classroom-member-work.component';
import { ClassroomOwnerWorkComponent } from './classroom-owner-work/classroom-owner-work.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    ClassroomComponent,
    JoinClassComponent,
    CreateClassRoomComponent,
    ClassroomMemberComponent,
    ClassroomOwnerComponent,
    AnnounceManageComponent,
    ClassroomMemberWorkComponent,
    ClassroomOwnerWorkComponent,
    UserManagmentComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
