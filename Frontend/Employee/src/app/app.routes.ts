import { Routes } from '@angular/router';
import { UsersComponent } from './Components/users/users.component';
import { UsersDetailsComponent } from './Components/users-details/users-details.component';
import { ErrorsComponent } from './Components/errors/errors.component';

export const routes: Routes = [
    {path:"",component:UsersComponent},
    {path:"users",component:UsersComponent},
    {path:"users/:id",component:UsersDetailsComponent},
    {path:"**",component:ErrorsComponent}
];
