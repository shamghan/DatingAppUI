import { Routes } from '@angular/router';
import { Home } from '../features/home/home';
import { MemberList } from '../features/members/member-list/member-list';
import { MemberDetailed } from '../features/members/member-detailed/member-detailed';
import { Messages } from '../features/messages/messages';
import { Lists } from '../features/lists/lists';

export const routes: Routes = [
{path:'', component: Home},
{path:'members',component: MemberList},
{path:'member/:id', component:MemberDetailed},
{path:'lists', component:Lists},
{path:'messages', component:Messages},
{path:'**', component:Home}//route that does not exists then open this page

];
