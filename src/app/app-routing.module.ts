import { ClassroomMemberWorkComponent } from './classroom-member-work/classroom-member-work.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassroomMemberComponent } from './classroom-member/classroom-member.component';
import { ClassroomOwnerWorkComponent } from './classroom-owner-work/classroom-owner-work.component';
import { ClassroomOwnerComponent } from './classroom-owner/classroom-owner.component';
import { ClassroomComponent } from './classroom/classroom.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.components';
import { UserManagmentComponent } from './user-managment/user-managment.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
        { path: 'classroom', component: ClassroomComponent},
        { path: 'classroomowner/:classroomId', component: ClassroomOwnerComponent},
        { path: 'classroommember/:classroomId', component: ClassroomMemberComponent},
        { path: 'classroomowner/:classroomId/:workId', component: ClassroomOwnerWorkComponent},
        { path: 'classroommember/:classroomId/:workId', component: ClassroomMemberWorkComponent},
        { path: 'usermanagment', component: UserManagmentComponent},
    ]
   },
   { path: 'login',component: LoginComponent },
   { path: 'register',component: RegisterComponent },
   { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
