import { Routes, RouterModule } from "@angular/router";
import { AddUserComponent } from "./add-user/add-user.component";
import { EditUserComponent } from "./edit-user/edit-user.component";
import { ListUserComponent } from "./list-user/list-user.component";
import { LoginComponent } from "./login/login.component";


const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'add-user', component: AddUserComponent },
    { path: 'list-user', component: ListUserComponent },
    { path: 'edit-user', component: EditUserComponent },
    { path: '', component: LoginComponent }
]

export const routing = RouterModule.forRoot(routes);