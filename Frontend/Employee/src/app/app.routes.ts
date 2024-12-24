import { Routes } from '@angular/router';
import { UsersComponent } from './Components/users/users.component';
import { UsersDetailsComponent } from './Components/users-details/users-details.component';
import { ErrorsComponent } from './Components/errors/errors.component';
import { NewUserComponent } from './Components/new-user/new-user.component';
import { LoginComponent } from './Components/login/login.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { HrRequestsComponent } from './Components/hr-requests/hr-requests.component';
import { RequestVacationComponent } from './Components/request-vacation/request-vacation.component';

export const routes: Routes = [
    {path:"",component:LoginComponent},
    {path:"users",component:UsersComponent},
    {path:"users/:id",component:UsersDetailsComponent},
    {path:"NewUser",component:NewUserComponent},
    {path:"reqVac",component:RequestVacationComponent},
    {path:"changePassword",component:ChangePasswordComponent},
    {path:"hrRequests",component:HrRequestsComponent},
    {path:"**",component:ErrorsComponent}
];
